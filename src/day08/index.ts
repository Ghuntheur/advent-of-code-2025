import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(
  join(import.meta.dirname, 'input.txt'),
  'utf-8',
).trim();

const unique = <T>(items: T[], key: keyof T): T[] => {
  return [...new Map(items.map((item) => [item[key], item])).values()];
};

type Point = { id: string; x: number; y: number; z: number };
type Edge = { id: string; distance: number; points: [Point, Point] };
type Circuit = { edges: Edge[]; points: Point[]; id: string };

const createPoints = (input: string): Point[] => {
  return input.split('\n').map((line) => {
    const [x, y, z] = line.split(',');
    return { x: +x, y: +y, z: +z, id: line };
  });
};

const createEdges = (points: Point[]): Edge[] => {
  const edges: Edge[] = [];
  points.forEach((point) => {
    for (const p of points) {
      if (p.id === point.id) continue;

      const distance = Math.sqrt(
        (p.x - point.x) ** 2 + (p.y - point.y) ** 2 + (p.z - point.z) ** 2,
      );

      edges.push({
        distance,
        id: [p.id, point.id].sort((a, b) => a.localeCompare(b)).join('-'),
        points: [p, point],
      });
    }
  });

  return unique(edges, 'id').sort((a, b) => a.distance - b.distance);
};

const part1 = (input: string): number => {
  const points = createPoints(input);
  const edges = createEdges(points);

  const circuits: Circuit[] = [];

  for (const edge of edges.slice(0, 1000)) {
    const edgePoints = edge.points;

    const sameCircuit = circuits.find((circuit) =>
      circuit.points.some(
        (point) =>
          point.id === edgePoints[0].id && point.id === edgePoints[1].id,
      ),
    );

    if (sameCircuit) {
      continue;
    }

    const foundCircuits = circuits.filter((circuit) =>
      circuit.points.some(
        (point) =>
          point.id === edgePoints[0].id || point.id === edgePoints[1].id,
      ),
    );

    if (foundCircuits.length === 1) {
      foundCircuits[0].edges.push(edge);
      foundCircuits[0].points.push(...edgePoints);
      continue;
    }

    if (foundCircuits.length === 2) {
      circuits.push({
        edges: unique(
          foundCircuits.reduce<Edge[]>((acc, item) => {
            acc.push(...item.edges);
            return acc;
          }, []),
          'id',
        ),
        id: Math.random().toString(),
        points: unique(
          foundCircuits.reduce<Point[]>((acc, item) => {
            acc.push(...item.points);
            return acc;
          }, []),
          'id',
        ),
      });

      foundCircuits.forEach((circuit) => {
        circuits.splice(
          circuits.findIndex((c) => c.id === circuit.id),
          1,
        );
      });

      continue;
    }

    circuits.push({
      edges: [edge],
      points: edge.points,
      id: Math.random().toString(),
    });
  }

  const filteredCircuits = circuits.map((circuit) =>
    unique(circuit.points, 'id'),
  );

  return filteredCircuits
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .reduce((acc, item) => (acc *= item.length), 1);
};

const part2 = (input: string): number => {
  return 0;
};

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
