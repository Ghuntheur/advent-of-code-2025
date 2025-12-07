import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8',
).trim();

const part1 = (input: string): number => {
  const lines = input.split('\n');

  const newGrid = [lines[0].replace('S', '|')];
  let splitTotal = 0;

  lines.slice(1).forEach((line, index) => {
    const previousLine = newGrid[index];

    const beamIndexes = [...previousLine.matchAll(/\|/g)].map(
      (item) => item.index,
    );

    const newLine = line.split('');
    for (const i of beamIndexes) {
      if (line[i] !== '^') {
        newLine[i] = '|';
      } else {
        newLine[i - 1] = '|';
        newLine[i + 1] = '|';
        splitTotal++;
      }
    }

    newGrid.push(newLine.join(''));
  });

  console.table(newGrid);

  return splitTotal;
};

const part2 = (input: string): number => {
  return 0;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
