import { randomUUID } from 'crypto';

import { Message } from '../types';

/**
 * Converts a human readable time string to milliseconds.
 */
export const timeToMilliseconds = (timeStr: string): number => {
  const timeUnits: { [key: string]: number } = {
    h: 3600000, // hours to milliseconds
    m: 60000, // minutes to milliseconds
    s: 1000, // seconds to milliseconds
  };

  return timeStr.split(' ').reduce((total, part) => {
    const unit = part.slice(-1);
    const value = parseInt(part.slice(0, -1), 10);
    return total + value * (timeUnits[unit] || 0);
  }, 0);
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: randomUUID(),
    message: 'Hey team! I created a Doodle poll for our monthly team lunch 🍕',
    author: 'Luca',
    timestamp: new Date(
      Date.now() - timeToMilliseconds('5h 12m 30s')
    ).toISOString(),
  },
  {
    id: randomUUID(),
    message: 'Cool! It&#39;s super easy to vote.',
    author: 'Liam',
    timestamp: new Date(
      Date.now() - timeToMilliseconds('4h 10m')
    ).toISOString(),
  },
  {
    id: randomUUID(),
    message:
      'Could everyone vote by tomorrow? Then we can lock in the restaurant reservation.',
    author: 'Luca',
    timestamp: new Date(
      Date.now() - timeToMilliseconds('3h 7m 30s')
    ).toISOString(),
  },
  {
    id: randomUUID(),
    message: "Done! Love how it shows everyone's availability at a glance.",
    author: 'Heidi',
    timestamp: new Date(Date.now() - timeToMilliseconds('2h 5m')).toISOString(),
  },
  {
    id: randomUUID(),
    message: "Just submitted my preferences. Can't wait for the lunch! 😋",
    author: 'Sofia',
    timestamp: new Date(
      Date.now() - timeToMilliseconds('1h 2m 30s')
    ).toISOString(),
  },
] as const;

export { INITIAL_MESSAGES };
