import { count } from 'console';
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
  type Block = { index: number; count: number };

  const lines = input.split('\n');

  let blocks: Block[] = [{ index: lines[0].indexOf('S'), count: 1 }];

  const mergeBlocks = (): Block[] => {
    const groupedBlocks = Object.groupBy(blocks, (block) => block.index);
    const mergedBlocks: Block[] = [];

    for (const [indexStr, items] of Object.entries(groupedBlocks)) {
      if (!items) continue;

      if (items.length > 1) {
        mergedBlocks.push({
          index: +indexStr,
          count: items.reduce((acc, item) => acc + item.count, 0),
        });
      } else {
        mergedBlocks.push(items[0]);
      }
    }

    return mergedBlocks;
  };

  for (const line of lines.slice(1)) {
    const splitIndexes = [...line.matchAll(/\^/g)].map((item) => item.index);
    if (!splitIndexes.length) continue;

    for (const index of splitIndexes) {
      const blockToSplit = blocks.filter((block) => block.index === index);

      blockToSplit.forEach((block) => {
        const leftBlock: Block = { index: block.index - 1, count: block.count };
        const rightBlock: Block = {
          index: block.index + 1,
          count: block.count,
        };
        blocks.push(leftBlock, rightBlock);
        block.count = 0;
      });
    }

    blocks = blocks.filter((block) => block.count !== 0);
    blocks = mergeBlocks();

    console.log(blocks);
  }

  const total = blocks.reduce((acc, item) => acc + item.count, 0);

  return total;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
