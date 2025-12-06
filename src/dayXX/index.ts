import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8',
).trim();

const part1 = (input: string): number => {
  return 0;
};

const part2 = (input: string): number => {
  return 0;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
