import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Observable, SubscriptionLike, Subject, Observer, interval } from 'rxjs';
import { share, distinctUntilChanged, takeWhile, filter, map } from 'rxjs/operators';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

import { PathConfig } from '../../configs/routes';

import { IWebsocketService, IWsMessage, WebSocketConfig } from './websocket.interfaces';
import { config } from './websocket.config';

import * as ChatActions from "../store/chat/chat.actions";
import {ChatFacadeService} from "../store/chat";
import {WS} from "./websocket.events";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements IWebsocketService, OnDestroy {

  private config: WebSocketSubjectConfig<IWsMessage[]>;

  private websocketSub: SubscriptionLike;
  private statusSub: SubscriptionLike;

  private reconnection$: Observable<number>;
  private websocket$: WebSocketSubject<IWsMessage[]>;
  private connection$: Observer<boolean>;
  private wsMessages$: Subject<IWsMessage[]>;

  private reconnectInterval: number;
  private reconnectAttempts: number;
  private isConnected: boolean;

  public status: Observable<boolean>;

  constructor(
    @Inject(config) private wsConfig: WebSocketConfig,
    private chatFacade: ChatFacadeService) {
    this.wsMessages$ = new Subject<IWsMessage[]>();

    this.reconnectInterval = wsConfig.reconnectInterval || 5000; // pause between connections
    this.reconnectAttempts = wsConfig.reconnectAttempts || 10; // number of connection attempts

    const { wsPort, baseUrl, apiWSEndpoint, chat} = PathConfig;

    this.config = {
      url: `ws://localhost${wsPort}${baseUrl}${apiWSEndpoint}${chat}`,
      closeObserver: {
        next: (event: CloseEvent) => {
          this.websocket$ = null;
          this.connection$.next(false);
        }
      },
      openObserver: {
        next: (event: Event) => {
          console.log('WebSocket connected!');
          this.connection$.next(true);
        }
      }
    };

    // connection status
    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());
    // run reconnect if not connection
    this.statusSub = this.status
      .subscribe((isConnected) => {
        this.isConnected = isConnected;

        if (!this.reconnection$ && typeof(isConnected) === 'boolean' && !isConnected) {
          this.reconnect();
        }
      });

    this.websocketSub = this.wsMessages$.subscribe(
      (messages:IWsMessage[]) => this.chatFacade.getHistoryChat(messages),
      (error: ErrorEvent) => console.error('WebSocket error!', error)
    );

    this.connect();
  }

  ngOnDestroy() {
    this.websocketSub.unsubscribe();
    this.statusSub.unsubscribe();
  }

  /*
  * connect to WebSocked
  * */
  private connect(): void {
    this.websocket$ = new WebSocketSubject(this.config);
    this.websocket$.subscribe(
      (message) => this.wsMessages$.next(message),
      (error: Event) => {
        if (!this.websocket$) {
          // run reconnect if errors
          this.reconnect();
        }
      });
  }

  /*
  * reconnect if not connecting or errors
  * */
  private reconnect(): void {
    this.reconnection$ = interval(this.reconnectInterval)
      .pipe(takeWhile((v, index) => index < this.reconnectAttempts && !this.websocket$));

    this.reconnection$.subscribe(
      () => this.connect(),
      null,
      () => {
        // Subject complete if reconnect attempts ending
        this.reconnection$ = null;

        if (!this.websocket$) {
          this.wsMessages$.complete();
          this.connection$.complete();
        }
      });
  }

  /*
  * on message event
  * */
  public on(): Observable<IWsMessage[]> {
    // if (event) {
      return this.wsMessages$.pipe(
        // filter((message: IWsMessage<T>) => message.event === event),
        map((message: IWsMessage[]) => {
          console.log('--ws-service---on-message--: ', message);
          return message;
        })
      );
    // }
  }


  /*
  * on message to server
  * */
  public send(event: string, data: any = {}): void {
    if (event === WS.SEND.SEND_TEXT && this.isConnected) {
      this.websocket$.next(<any>JSON.stringify({ event, data }));
    } else {
      console.error('Send error!');
    }
  }

}
