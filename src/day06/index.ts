import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8',
).trim();

const part1 = (input: string): number => {
  const lines = input.split('\n');

  const formatedItems = lines.flatMap((line) =>
    line.replace(/\s+/g, ' ').trim().split(' '),
  );

  const { operations, numbers } = Object.groupBy(formatedItems, (item) => {
    if (item === '*' || item === '+') {
      return 'operations';
    }
    return 'numbers';
  });

  return operations!.reduce((acc, operation, i) => {
    const lineNumbers = numbers!
      .filter((_, index) => index % operations!.length === i)
      .map((item) => +item);

    const result =
      operation === '+'
        ? lineNumbers.reduce((acc, item) => (acc += item))
        : lineNumbers.reduce((acc, item) => (acc *= item));

    return acc + result;
  }, 0);
};

const part2 = (input: string): number => {
  const isBreak = (digits: string[]) => digits.every((item) => item === '0');

  const grid = input.replace(/ /g, '0');
  const lines = grid.split('\n').map((line) => `0${line}`);

  const numberLines = lines.slice(0, -1);
  const signs = lines.at(-1)!;

  const lineLength = numberLines[0].length;
  const operations = signs.split('0').filter(Boolean);

  let i = lineLength - 1;
  let total = 0;

  let currentStack = [];

  while (i >= 0) {
    const columnDigits = numberLines.map((item) => item[i]);

    if (!isBreak(columnDigits)) {
      currentStack.push(+columnDigits.filter((item) => item !== '0').join(''));
    } else {
      const currentOperation = operations.pop();
      const result =
        currentOperation === '+'
          ? currentStack.reduce((acc, item) => (acc += item), 0)
          : currentStack.reduce((acc, item) => (acc *= item), 1);

      total += result;
      currentStack = [];
    }

    i--;
  }

  return total;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
