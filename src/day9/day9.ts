const mask = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export const part1 = (input: string): number => {
  const table = parseInput(input);

  let result = 0;

  for (let x = 0; x < table.length; x++) {
    for (let y = 0; y < table[x].length; y++) {
      let minPoint = true;
      for (const [maskX, maskY] of mask) {
        if (isValid(table, x + maskX, y + maskY)) {
          if (table[x][y] >= table[x + maskX][y + maskY]) {
            minPoint = false;
            break;
          }
        }
      }
      if (minPoint) {
        result += table[x][y] + 1;
      }
    }
  }
  return result;
};

const isValid = (table: number[][], x: number, y: number): boolean => {
  const maxX = table.length - 1;
  const maxY = table[0].length - 1;

  return x <= maxX && y <= maxY && x >= 0 && y >= 0;
};

const parseInput = (input: string): number[][] => {
  const result: number[][] = [];
  for (let row of input.split('\n')) {
    const values = row
      .trim()
      .split('')
      .map((value) => +value);
    result.push(values);
  }

  return result;
};

export const part2 = (input: string): number => {
  const table = parseInput(input);
  let basins: number[] = [];

  for (let x = 0; x < table.length; x++) {
    for (let y = 0; y < table[x].length; y++) {
      let minPoint = true;
      for (const [maskX, maskY] of mask) {
        if (isValid(table, x + maskX, y + maskY)) {
          if (table[x][y] >= table[x + maskX][y + maskY]) {
            minPoint = false;
            break;
          }
        }
      }
      if (minPoint) {
        basins.push(findBasinSize(table, x, y));
        // find basinSize
      }
    }
  }
  const sorted = basins.sort((a, b) => b - a);
  return sorted[0] * sorted[1] * sorted[2];
};

const findBasinSize = (
  table: number[][],
  startX: number,
  startY: number
): number => {
  const visited: { x: number; y: number }[] = [];
  const neighbors: { x: number; y: number }[] = [];
  neighbors.push({ x: startX, y: startY });
  let result = 0;
  while (neighbors.length > 0) {
    const node = neighbors.pop();
    const isVisited =
      visited.findIndex(({ x, y }) => node?.x === x && node?.y === y) >= 0;
    if (node && !isVisited) {
      result += 1;
      const x = node.x;
      const y = node.y;
      visited.push({ x, y });
      for (const [maskX, maskY] of mask) {
        if (
          isValid(table, x + maskX, y + maskY) &&
          table[x][y] < table[x + maskX][y + maskY] &&
          table[x + maskX][y + maskY] !== 9
        ) {
          neighbors.push({ x: x + maskX, y: y + maskY });
        }
      }
    }
  }
  return result;
};
