import { IChat, IChatError } from '../../models';

export const chatKey = 'chat';

export interface IChatState {
  messages: IChat[]; // chat for chat page
  error: IChatError;
}

export const chatInitialState: IChatState = {
  messages: [],
  error: null
}
