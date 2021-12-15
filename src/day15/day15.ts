export const part1 = (input: string): number => {
  const table = parseInput(input);
  return aStar(0, 0, table);
};

export const part2 = (input: string): number => {
  const table = parseInput(input);
  const width = table.length;
  const height = table[0].length;
  const newTable = Array(width * 5)
    .fill([])
    .map(() => new Array(height * 5));
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      for (let xPadding = 0; xPadding < 5; xPadding++) {
        for (let yPadding = 0; yPadding < 5; yPadding++) {
          newTable[x + xPadding * width][y + yPadding * height] =
            table[x][y] + xPadding + yPadding > 9
              ? table[x][y] + xPadding + yPadding - 9
              : table[x][y] + xPadding + yPadding;
        }
      }
    }
  }
  return aStar(0, 0, newTable);
};

const aStar = (startX: number, startY: number, table: number[][]): number => {
  const width = table.length;
  const height = table[0].length;
  const goalX = width - 1;
  const goalY = height - 1;
  const openSet: [number, number][] = [];
  openSet.push([startX, startY]);
  const cameFrom = Array(width).fill([]);
  const gScore = Array(width)
    .fill([])
    .map(() => new Array(height).fill(Number.MAX_SAFE_INTEGER));
  gScore[startX][startY] = 0;

  const fScore = Array(width)
    .fill([])
    .map(() => new Array(height).fill(Number.MAX_SAFE_INTEGER));
  //fScore[startX][startY] = h(startX, startY, goalX, goalY);
  fScore[startX][startY] = table[startX][startY];

  while (openSet.length > 0) {
    const [x, y] = getLowestOpenNode(openSet, fScore);
    if (x === goalX && y === goalY) {
      //break;
    }

    const neighbors = getValidNeighbors(x, y, goalX, goalY);
    for (const [neighborX, neighborY] of neighbors) {
      const tentativeGScore = gScore[x][y] + table[neighborX][neighborY];
      if (tentativeGScore <= gScore[neighborX][neighborY]) {
        cameFrom[neighborX][neighborY] = [x, y];
        gScore[neighborX][neighborY] = tentativeGScore;
        fScore[neighborX][neighborY] =
          tentativeGScore + h(neighborX, neighborY, goalX, goalY);
        const isInOpenSet = openSet.findIndex(
          ([openX, openY]) => openX === neighborX && openY === neighborY
        );
        if (isInOpenSet < 0) {
          openSet.push([neighborX, neighborY]);
        }
      }
    }
  }
  //console.log(gScore);
  return gScore[goalX][goalY];
};

const h = (x: number, y: number, goalX: number, goalY: number): number => {
  return 0; //Math.abs(x - goalX) + Math.abs(y - goalY);
};

const getLowestOpenNode = (
  openSet: [number, number][],
  fScore: number[][]
): [number, number] => {
  let minIndex = 0;
  let min = Number.MAX_SAFE_INTEGER;
  for (let index = 0; index < openSet.length; index++) {
    const [x, y] = openSet[index];
    if (fScore[x][y] <= min) {
      minIndex = index;
      min = fScore[x][y];
    }
  }
  const result = openSet.splice(minIndex, 1)[0];
  return result;
};

const getValidNeighbors = (
  x: number,
  y: number,
  goalX: number,
  goalY: number
): [number, number][] => {
  const neighborMask = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const result: [number, number][] = [];

  for (const [maskX, maskY] of neighborMask) {
    if (isValid(maskX + x, maskY + y, goalX, goalY)) {
      result.push([maskX + x, maskY + y]);
    }
  }

  return result;
};

const isValid = (x: number, y: number, xMax: number, yMax: number): boolean => {
  return x >= 0 && y >= 0 && x <= xMax && y <= yMax;
};

const parseInput = (input: string): number[][] => {
  const table: number[][] = [];
  for (const line of input.split('\n')) {
    const row: number[] = [];
    for (const num of line.trim().split('')) {
      row.push(+num);
    }
    table.push(row);
  }

  return table;
};
