import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8'
).trim();

const part1 = (input: string): number => {
  const ranges = input.split(',');

  return ranges.reduce((acc, range) => {
    const [start, end] = range.split('-');

    for (let i = +start; i <= +end; i++) {
      if (i.toString().match(/^(\d+)\1$/)) {
        acc += i;
      }
    }

    return acc;
  }, 0);
};

console.log('Part 1:', part1(input));
// console.log('Part 2:', part2(input));
