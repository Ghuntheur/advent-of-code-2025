import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8'
).trim();

function part1(input: string): number {
  const lines = input.split('\n');
  let total0 = 0;
  let current = 50;

  for (const line of lines) {
    if (line.startsWith('R')) current += +line.slice(1);
    else current -= +line.slice(1);
    if (current % 100 === 0) total0++;
  }

  return total0;
}

function part2(input: string): number {
  const lines = input.split('\n');
  let total0 = 0;
  let current = 50;

  for (const line of lines) {
    const direction = line[0];
    const distance = +line.slice(1);

    for (let i = 0; i < distance; i++) {
      if (direction === 'R') {
        current = (current + 1) % 100;
      } else {
        current = (current - 1 + 100) % 100;
      }

      if (current === 0) {
        total0++;
      }
    }
  }

  return total0;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
