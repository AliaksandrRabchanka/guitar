import { Observable } from 'rxjs';

export interface IWebsocketService {
  on(event: string): Observable<IWsMessage[]>;
  send(event: string, data: any): void;
  status: Observable<boolean>;
}

export interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}

export interface IWsMessage {
  name: string;
  message: string;
}
