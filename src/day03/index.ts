import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8'
).trim();

const part1 = (input: string): number => {
  const lines = input.split('\n');

  return lines.reduce((acc, line) => {
    const lineAsArray = line.split('').map(Number);
    let max = Math.max(...lineAsArray);
    let maxIndex = lineAsArray.findIndex((item) => item === max);

    if (maxIndex === lineAsArray.length - 1) {
      const firstMax = Math.max(...lineAsArray.slice(0, -1));

      return acc + +`${firstMax}${max}`;
    }

    const secondMax = Math.max(...lineAsArray.slice(maxIndex + 1));

    return acc + +`${max}${secondMax}`;
  }, 0);
};

const part2 = (input: string): number => {
  return 0;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
