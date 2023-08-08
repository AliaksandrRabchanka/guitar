import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { combineLatest, Observable, of, Subscription, takeUntil } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { ChatFacadeService } from '../../store/chat';
import { IBuildVersion, IChat, IUser } from '../../models';

import { IWsMessage, WebsocketService } from '../../websocket';
import { WS } from '../../websocket/websocket.events';

import { AutoCloseable } from '../../utils/auto-closable';
import { UserFacadeService } from '../../store/user';

export interface IMessage {
  name: string;
  message: string;
}

@Component({
  selector: 'guitar-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChatPageComponent extends AutoCloseable implements OnInit {
  // public chatData$: Observable<IChat> = this.chatFacade.chat$.pipe(
  //   map((chat: IChat): IChat => this.getChatInfo(chat)),
  // );
  public messages: IChat[];
  public form: UntypedFormGroup;
  public userName: string;

  // messages$: Observable<IWsMessage[]>;
  // counter$: Observable<number>;
  // texts$: Observable<string[]>;

  constructor(
    private userFacade: UserFacadeService,
    private chatFacade: ChatFacadeService,
    private changeDetectorRefs: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    private wsService: WebsocketService
  ) {
    super();
    // get messages
    // this.messages$ = of([{  name: 'User-1', message: 'text-message-1'}, {  name: 'User-2', message: 'text-message-2'}]);
  /*  this.messages$ = this.wsService.on().pipe(
      map((messages: IMessage[]) => {
        this.changeDetectorRefs.markForCheck();
        return messages;
      })
    );*/
    // get counter
    // this.counter$ = of(2);

    // get texts
    // this.texts$ = of(['test-1', 'test-2']);
    // this.wsService.on<any>(WS.ON.MESSAGES)
    //   .subscribe((messages: IMessage[]) => {
    //     console.log('****', messages);
    //     this.chatData.push(messages);
    //     // this.wsService.send(WS.SEND.SEND_TEXT, 'Test Text!');
    //   });
    // this.chatFacade.getChat();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, [
        Validators.required
      ]]
    });

    this.userFacade.userLogin$.pipe(
      takeUntil(this.destroyedSource),
    ).subscribe(
      (user: IUser) => {
        this.userName = user?.login || 'User';
        this.changeDetectorRefs.detectChanges();
      }
    );
    // this.chatFacade.getChat();
    combineLatest([
      this.chatFacade.chat$,
    ]).pipe(
      takeUntil(this.destroyedSource),
    )
      .subscribe(([chat]:[chat:any]) => {
        this.messages = chat;
        this.changeDetectorRefs.markForCheck();
      });
  }

  public sendText(): void {
    if (this.form.valid) {
      const data = {
        name : this.userName,
        message: this.form.value.text
      }
      this.wsService.send(WS.SEND.SEND_TEXT, data);
      this.form.reset();
    }
  }

  public removeText(index: number): void {
    this.wsService.send(WS.SEND.REMOVE_TEXT, index);
  }
}
