import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8',
).trim();

type Interval = { start: number; end: number };

const mergeIntervals = (data: Interval[]): Interval[] => {
  const sortedData = data.sort((a, b) => a.start - b.start);
  const intervals = [sortedData[0]];

  for (let i = 1; i < sortedData.length; i++) {
    const current = sortedData[i];

    if (current.start <= intervals.at(-1)!.end) {
      intervals.at(-1)!.end = Math.max(current.end, intervals.at(-1)!.end);
    } else {
      intervals.push(sortedData[i]);
    }
  }

  return intervals;
};

const part1 = (input: string): number => {
  const lines = input.split('\n').filter(Boolean);

  const { ranges, ids } = Object.groupBy(lines, (line) =>
    line.includes('-') ? 'ranges' : 'ids',
  );

  const intervals: Interval[] = ranges!.map((line) => {
    const [start, end] = line.split('-');
    return { start: +start, end: +end };
  });

  const mergedIntervals = mergeIntervals(intervals);

  const freshIds = ids?.filter((id) =>
    mergedIntervals.some(
      (interval) => interval.start <= +id && interval.end >= +id,
    ),
  );

  return freshIds?.length || 0;
};

const part2 = (input: string): number => {
  const ranges = input.split('\n').filter((item) => item.includes('-'));
  const intervals: Interval[] = ranges!.map((line) => {
    const [start, end] = line.split('-');
    return { start: +start, end: +end };
  });

  const mergedIntervals = mergeIntervals(intervals);

  return mergedIntervals.reduce(
    (acc, interval) => acc + (interval.end - interval.start + 1),
    0,
  );
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
