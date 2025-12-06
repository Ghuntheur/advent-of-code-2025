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

    // const lineCalc = lineNumbers.join(operation);
    // const result = eval(lineCalc);

    const result =
      operation === '+'
        ? lineNumbers.reduce((acc, item) => (acc += item))
        : lineNumbers.reduce((acc, item) => (acc *= item));

    return acc + result;
  }, 0);
};

const part2 = (input: string): number => {
  return 0;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
