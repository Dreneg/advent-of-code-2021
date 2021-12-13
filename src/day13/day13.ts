interface Fold {
  along: 'x' | 'y';
  position: number;
}

export const part1 = (input: string): number => {
  const table: Record<string, boolean> = {};
  const folds: Fold[] = [];
  for (const rawLine of input.split('\n')) {
    const line = rawLine.trim();
    if (line.indexOf(',') >= 0) {
      const [x, y] = line.split(',');
      table[`${x}_${y}`] = true;
    } else if (line.indexOf('fold along') >= 0) {
      const [along, position] = line.substring(10).split('=');

      folds.push({
        along: along.trim() === 'x' ? 'x' : 'y',
        position: +position,
      });
    }
  }

  const fold = folds[0];
  if (fold.along === 'x') {
    for (const key of Object.keys(table)) {
      const [rawX, rawY] = key.split('_');
      const [x, y] = [+rawX, +rawY];
      if (x > fold.position) {
        const distance = x - fold.position;
        const newX = fold.position - distance;
        table[`${newX}_${y}`] = true;
        table[`${x}_${y}`] = false;
      }
    }
  } else {
    for (const key of Object.keys(table)) {
      const [rawX, rawY] = key.split('_');
      const [x, y] = [+rawX, +rawY];
      if (y > fold.position) {
        const distance = y - fold.position;
        const newY = fold.position - distance;
        table[`${x}_${newY}`] = true;
        table[`${x}_${y}`] = false;
      }
    }
  }

  return Object.values(table).reduce(
    (total, value) => total + (value ? 1 : 0),
    0
  );
};

export const part2 = (input: string): string[][] => {
  const table: Record<string, boolean> = {};
  const folds: Fold[] = [];
  for (const rawLine of input.split('\n')) {
    const line = rawLine.trim();
    if (line.indexOf(',') >= 0) {
      const [x, y] = line.split(',');
      table[`${x}_${y}`] = true;
    } else if (line.indexOf('fold along') >= 0) {
      const [along, position] = line.substring(10).split('=');

      folds.push({
        along: along.trim() === 'x' ? 'x' : 'y',
        position: +position,
      });
    }
  }

  for (const fold of folds) {
    if (fold.along === 'x') {
      for (const key of Object.keys(table)) {
        const [rawX, rawY] = key.split('_');
        const [x, y] = [+rawX, +rawY];
        if (x > fold.position) {
          const distance = x - fold.position;
          const newX = fold.position - distance;
          table[`${newX}_${y}`] = true;
          delete table[`${x}_${y}`];
        }
      }
    } else {
      for (const key of Object.keys(table)) {
        const [rawX, rawY] = key.split('_');
        const [x, y] = [+rawX, +rawY];
        if (y > fold.position) {
          const distance = y - fold.position;
          const newY = fold.position - distance;
          table[`${x}_${newY}`] = true;
          delete table[`${x}_${y}`];
        }
      }
    }
  }
  return printableOutput(table);
};

const printableOutput = (input: Record<string, boolean>): string[][] => {
  let min: number[] = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
  let max: number[] = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

  for (const key of Object.keys(input)) {
    const [rawX, rawY] = key.split('_');
    const [x, y] = [+rawX, +rawY];
    if (x < min[0]) {
      min[0] = x;
    }
    if (x > max[0]) {
      max[0] = x;
    }
    if (y < min[1]) {
      min[1] = y;
    }
    if (y > max[1]) {
      max[1] = y;
    }
  }
  const xPadding = 0 - min[0];
  const yPadding = 0 - min[0];
  const xMax = max[0] + xPadding;
  const yMax = max[1] + yPadding;

  const output: string[][] = [];
  for (let index = 0; index <= yMax; index++) {
    output.push(Array(xMax + 1).fill('.'));
  }

  for (const key of Object.keys(input)) {
    const [rawX, rawY] = key.split('_');
    const [x, y] = [+rawX, +rawY];

    output[y][x] = '#';
  }
  return output;
};
