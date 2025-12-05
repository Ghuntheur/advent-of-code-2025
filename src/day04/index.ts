import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8',
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
  const grid = input.split('\n').map((line) => line.split(''));
  const rows = grid.length;
  const cols = grid[0].length || 0;

  const countNeighbors = (col: number, row: number) => {
    const left = grid?.[row]?.[col - 1];
    const right = grid?.[row]?.[col + 1];
    const top = grid?.[row - 1]?.[col];
    const bottom = grid?.[row + 1]?.[col];
    const topLeft = grid?.[row - 1]?.[col - 1];
    const topRight = grid?.[row - 1]?.[col + 1];
    const bottomLeft = grid?.[row + 1]?.[col - 1];
    const bottomRight = grid?.[row + 1]?.[col + 1];

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

    return all.filter((item) => item === '@').length;
  };

  let totalRemoved = 0;

  while (true) {
    let toRemove: { col: number; row: number }[] = [];

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        if (grid[j][i] === '@' && countNeighbors(i, j) < 4) {
          toRemove.push({ col: i, row: j });
        }
      }
    }

    if (toRemove.length === 0) {
      break;
    }

    for (const { col, row } of toRemove) {
      grid[row][col] = '.';
      totalRemoved++;
    }

    toRemove = [];
  }

  return totalRemoved;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
