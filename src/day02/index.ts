import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8',
).trim();

const calcResult = (input: string, regex: RegExp): number => {
  const ranges = input.split(',');

  return ranges.reduce((acc, range) => {
    const [start, end] = range.split('-');

    for (let i = +start; i <= +end; i++) {
      if (i.toString().match(regex)) {
        acc += i;
      }
    }

    return acc;
  }, 0);
};

const part1 = (input: string): number => {
  return calcResult(input, /^(\d+)\1$/);
};

const part2 = (input: string): number => {
  return calcResult(input, /^(\d+)\1+$/);
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
