export const part1 = (input: string): number => {
  const collection: Record<string, number> = {};
  const lines = input.split('\n');
  for (const line of lines) {
    const [start, end] = line.trim().split(' -> ');
    const [startX, startY] = start.split(',').map((input) => +input);
    const [endX, endY] = end.split(',').map((input) => +input);

    if (startX === endX) {
      handleVerticalLine(startY, endY, collection, startX);
    } else if (startY === endY) {
      handleHorizontalLine(startX, endX, collection, startY);
    }
  }

  return Object.values(collection).reduce(
    (total, value) => (value > 1 ? total + 1 : total),
    0
  );
};

export const part2 = (input: string): number => {
  const collection: Record<string, number> = {};
  const lines = input.split('\n');
  for (const line of lines) {
    const [start, end] = line.trim().split(' -> ');
    const [startX, startY] = start.split(',').map((input) => +input);
    const [endX, endY] = end.split(',').map((input) => +input);

    if (startX === endX) {
      handleVerticalLine(startY, endY, collection, startX);
    } else if (startY === endY) {
      handleHorizontalLine(startX, endX, collection, startY);
    } else {
      handleDiagonal(endX, startX, endY, startY, collection);
    }
  }

  return Object.values(collection).reduce(
    (total, value) => (value > 1 ? total + 1 : total),
    0
  );
};

function handleHorizontalLine(
  startX: number,
  endX: number,
  collection: Record<string, number>,
  startY: number
) {
  const startPos = Math.min(startX, endX);
  const endPos = Math.max(startX, endX);
  for (let x = startPos; x <= endPos; x++) {
    increase(collection, x, startY);
  }
}

function handleVerticalLine(
  startY: number,
  endY: number,
  collection: Record<string, number>,
  startX: number
) {
  const startPos = Math.min(startY, endY);
  const endPos = Math.max(startY, endY);
  for (let y = startPos; y <= endPos; y++) {
    increase(collection, startX, y);
  }
}

function handleDiagonal(
  endX: number,
  startX: number,
  endY: number,
  startY: number,
  collection: Record<string, number>
) {
  const xMagnitude = endX - startX;
  const yMagnitude = endY - startY;
  if (Math.abs(xMagnitude) === Math.abs(yMagnitude)) {
    for (let i = 0; i <= Math.abs(xMagnitude); i++) {
      increase(
        collection,
        startX + i * Math.sign(xMagnitude),
        startY + i * Math.sign(yMagnitude)
      );
    }
  }
}

const increase = (
  collection: Record<string, number>,
  x: number,
  y: number
): void => {
  const current = getValue(collection, x, y);
  collection[getKey(x, y)] = current + 1;
};

const getKey = (x: number, y: number): string => {
  return `_${x}_${y}`;
};

const getValue = (
  collection: Record<string, number>,
  x: number,
  y: number
): number => {
  return collection[getKey(x, y)] || 0;
};
