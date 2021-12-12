export const part1 = (input: string): number => {
  const graph: Record<string, string[]> = parseInput(input);
  return findPathes(graph, [], 'start');
};

export const part2 = (input: string): number => {
  const graph: Record<string, string[]> = parseInput(input);
  return findPathes2(graph, {}, 'start');
};

const parseInput = (input: string): Record<string, string[]> => {
  const graph: Record<string, string[]> = {};
  for (const line of input.split('\n')) {
    const [left, right] = line.trim().split('-');
    graph[left] = graph[left] ? [...graph[left], right] : [right];
    graph[right] = graph[right] ? [...graph[right], left] : [left];
  }
  return graph;
};

const findPathes = (
  graph: Record<string, string[]>,
  visitedSmallCaves: string[],
  from: string
): number => {
  if (from === 'end') {
    return 1;
  }
  const visitedCaves = [...visitedSmallCaves];
  if (from.toUpperCase() !== from) {
    visitedCaves.push(from);
  }

  let result = 0;

  for (const cave of getValidNeighborCaves(graph, visitedCaves, from)) {
    result += findPathes(graph, visitedCaves, cave);
  }
  return result;
};

const getValidNeighborCaves = (
  graph: Record<string, string[]>,
  visitedSmallCaves: string[],
  cave: string
): string[] => {
  const neighbors = graph[cave] || [];
  return neighbors.filter(
    (neighborCave) => !visitedSmallCaves.includes(neighborCave)
  );
};

const findPathes2 = (
  graph: Record<string, string[]>,
  visitedSmallCaves: Record<string, number>,
  from: string
): number => {
  if (from === 'end') {
    return 1;
  }
  const visitedCaves = { ...visitedSmallCaves };
  if (from.toUpperCase() !== from) {
    visitedCaves[from] = (visitedCaves[from] || 0) + 1;
  }

  let result = 0;

  for (const cave of getValidNeighborCaves2(graph, visitedCaves, from)) {
    if (cave !== 'start') {
      result += findPathes2(graph, visitedCaves, cave);
    }
  }
  return result;
};

const getValidNeighborCaves2 = (
  graph: Record<string, string[]>,
  visitedSmallCaves: Record<string, number>,
  cave: string
): string[] => {
  const neighbors = graph[cave] || [];
  const anyAllowed = Object.values(visitedSmallCaves).every(
    (value) => value < 2
  );
  if (anyAllowed) {
    return [...neighbors];
  }
  const visitedSmallCaveKeys = Object.keys(visitedSmallCaves);
  return neighbors.filter(
    (neighborCave) => !visitedSmallCaveKeys.includes(neighborCave)
  );
};
