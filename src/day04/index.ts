import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8'
).trim();

const part1 = (input: string): number => {
  const lines = input.split('\n');
  let total = 0;

  for (let j = 0; j < lines.length; j++) {
    const line = lines[j];

    for (let i = 0; i < line.length; i++) {
      const item = lines[j][i];

      if (item !== '@') continue;

      const left = lines?.[j]?.[i - 1];
      const right = lines?.[j]?.[i + 1];
      const top = lines?.[j - 1]?.[i];
      const bottom = lines?.[j + 1]?.[i];
      const topLeft = lines?.[j - 1]?.[i - 1];
      const topRight = lines?.[j - 1]?.[i + 1];
      const bottomLeft = lines?.[j + 1]?.[i - 1];
      const bottomRight = lines?.[j + 1]?.[i + 1];

      const all = [
        left,
        right,
        top,
        bottom,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
      ];

      const sum = all.filter((item) => item === '@').length;
      if (sum < 4) {
        total++;
      }
    }
  }

  return total;
};

const part2 = (input: string): number => {
  return 0;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
