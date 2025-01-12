import { randomUUID } from 'crypto';
import { Message } from '../types';

export const initialMessages: Message[] = [
  {
    id: randomUUID(),
    message: 'Hey team! I created a Doodle poll for our monthly team lunch 🍕',
    author: 'Sarah',
    timestamp: new Date(Date.now() - 5000).toISOString(),
  },
  {
    id: randomUUID(),
    message: 'Cool! It was super easy to vote.',
    author: 'Mike',
    timestamp: new Date(Date.now() - 4000).toISOString(),
  },
  {
    id: randomUUID(),
    message:
      'Could everyone vote by tomorrow? Then we can lock in the restaurant reservation.',
    author: 'Sarah',
    timestamp: new Date(Date.now() - 3000).toISOString(),
  },
  {
    id: randomUUID(),
    message: "Done! Love how it shows everyone's availability at a glance.",
    author: 'Emily',
    timestamp: new Date(Date.now() - 2000).toISOString(),
  },
  {
    id: randomUUID(),
    message: "Just submitted my preferences. Can't wait for the lunch! 😋",
    author: 'David',
    timestamp: new Date().toISOString(),
  },
];
