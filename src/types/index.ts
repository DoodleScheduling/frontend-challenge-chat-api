interface Message {
  id: string;
  message: string;
  author: string;
  timestamp: string; // ISO 8601
}

interface GetMessagesQuery {
  limit?: string;
  since?: string;
}

interface CreateMessageBody {
  message: string;
  author: string;
}

export { Message, GetMessagesQuery, CreateMessageBody };
