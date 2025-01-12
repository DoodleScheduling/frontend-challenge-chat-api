export interface Message {
  id: string;
  message: string;
  author: string;
  timestamp: string; // ISO 8601
}

export interface GetMessagesQuery {
  limit?: string;
  since?: string;
}

export interface CreateMessageBody {
  message: string;
  author: string;
}
