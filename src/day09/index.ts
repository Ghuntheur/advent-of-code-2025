import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8',
).trim();

type Point = { x: number; y: number; id: string };
type Rectangle = { area: number; points: [Point, Point]; id: string };

const createPoints = (input: string): Point[] => {
  const lines = input.split('\n');
  return lines.map((line) => {
    const [x, y] = line.split(',').map(Number);
    return { x, y, id: line };
  });
};

const part1 = (input: string): number => {
  const points = createPoints(input);
  const rectangles: Rectangle[] = [];

  points.forEach((point) => {
    for (const p of points) {
      if (p.id === point.id) continue;

      const dx = Math.abs(p.x - point.x) + 1;
      const dy = Math.abs(p.y - point.y) + 1;

      const area = Math.abs(dx * dy);

      rectangles.push({
        area,
        points: [p, point],
        id: [p.id, point.id].sort((a, b) => a.localeCompare(b)).join('-'),
      });
    }
  });

  return rectangles.sort((a, b) => b.area - a.area)[0].area;
};

const part2 = (input: string): number => {
  return 0;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
