export interface IChat {
  name: string;
  message: string;
}

export interface IChatError {
  error: Error | string | null;
}
