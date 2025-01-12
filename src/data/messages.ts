import { randomUUID } from 'crypto';
import { Message } from '../types';

const INITIAL_MESSAGES: Message[] = [
  {
    id: randomUUID(),
    message: 'Hey team! I created a Doodle poll for our monthly team lunch 🍕',
    author: 'Luca',
    timestamp: new Date(Date.now() - 5000).toISOString(),
  },
  {
    id: randomUUID(),
    message: 'Cool! It&#39;s super easy to vote.',
    author: 'Liam',
    timestamp: new Date(Date.now() - 4000).toISOString(),
  },
  {
    id: randomUUID(),
    message:
      'Could everyone vote by tomorrow? Then we can lock in the restaurant reservation.',
    author: 'Luca',
    timestamp: new Date(Date.now() - 3000).toISOString(),
  },
  {
    id: randomUUID(),
    message: "Done! Love how it shows everyone's availability at a glance.",
    author: 'Heidi',
    timestamp: new Date(Date.now() - 2000).toISOString(),
  },
  {
    id: randomUUID(),
    message: "Just submitted my preferences. Can't wait for the lunch! 😋",
    author: 'Sofia',
    timestamp: new Date().toISOString(),
  },
] as const;

export { INITIAL_MESSAGES };
