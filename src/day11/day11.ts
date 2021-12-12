interface Position {
  x: number;
  y: number;
}

const neighborMask = [
  [-1, 1],
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 0],
  [0, -1],
  [-1, -1],
  [1, -1],
];

export const part1 = (input: string, iteration: number): number => {
  let result = 0;
  const octopuses: number[][] = [];
  for (const line of input.split('\n')) {
    const row: number[] = [];
    for (const num of line.trim().split('')) {
      row.push(+num);
    }
    octopuses.push(row);
  }

  for (let increment = 0; increment < iteration; increment++) {
    const expandables: Position[] = [];

    for (let x = 0; x < octopuses.length; x++) {
      for (let y = 0; y < octopuses[x].length; y++) {
        octopuses[x][y] = octopuses[x][y] + 1;
        if (octopuses[x][y] > 9) {
          expandables.push({ x, y });
        }
      }
    }

    const visited: Position[] = [];
    while (expandables.length > 0) {
      const octopus = expandables.pop();
      if (
        octopus &&
        !visited.some((pos) => octopus.x === pos.x && octopus.y === pos.y)
      ) {
        visited.push(octopus);
        for (const [maskX, maskY] of neighborMask) {
          const x = octopus.x + maskX;
          const y = octopus.y + maskY;
          if (isValid(x, y)) {
            octopuses[x][y] = octopuses[x][y] + 1;
            if (octopuses[x][y] > 9) {
              expandables.push({ x, y });
            }
          }
        }
      }
    }
    result += visited.length;

    for (const { x, y } of visited) {
      octopuses[x][y] = 0;
    }
  }

  return result;
};

export const part2 = (input: string): number => {
  const octopuses: number[][] = [];
  for (const line of input.split('\n')) {
    const row: number[] = [];
    for (const num of line.trim().split('')) {
      row.push(+num);
    }
    octopuses.push(row);
  }

  let flashCounter = 0;
  let iteration = 0;
  while (flashCounter !== 100) {
    iteration += 1;
    const expandables: Position[] = [];

    for (let x = 0; x < octopuses.length; x++) {
      for (let y = 0; y < octopuses[x].length; y++) {
        octopuses[x][y] = octopuses[x][y] + 1;
        if (octopuses[x][y] > 9) {
          expandables.push({ x, y });
        }
      }
    }

    const visited: Position[] = [];
    while (expandables.length > 0) {
      const octopus = expandables.pop();
      if (
        octopus &&
        !visited.some((pos) => octopus.x === pos.x && octopus.y === pos.y)
      ) {
        visited.push(octopus);
        for (const [maskX, maskY] of neighborMask) {
          const x = octopus.x + maskX;
          const y = octopus.y + maskY;
          if (isValid(x, y)) {
            octopuses[x][y] = octopuses[x][y] + 1;
            if (octopuses[x][y] > 9) {
              expandables.push({ x, y });
            }
          }
        }
      }
    }
    flashCounter = visited.length;

    for (const { x, y } of visited) {
      octopuses[x][y] = 0;
    }
  }

  return iteration;
};

const isValid = (x: number, y: number, xMax = 10, yMax = 10): boolean => {
  return x >= 0 && y >= 0 && x < xMax && y < yMax;
};
