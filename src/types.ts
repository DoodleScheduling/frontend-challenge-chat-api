export interface Message {
  id: string;
  message: string;
  author: string;
  timestamp: number;
}

export interface GetMessagesQuery {
  limit?: string;
  since?: string;
}

export interface CreateMessageBody {
  message: string;
  author: string;
}
