export interface Message {
  id: number;
  message: string;
}
export interface Queue {
  [key: string]: Message[];
}
export interface WaitingRequest {
  resolve: (response: Response) => void;
  timeout: NodeJS.Timeout;
}

export interface Response {
  status: number;
  data: any;
}
