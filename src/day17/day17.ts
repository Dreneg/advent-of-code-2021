export const part1 = (
  [xMin, xMax]: [number, number],
  [yMin, yMax]: [number, number]
): number => {
  const isInTarget = (x: number, y: number): boolean =>
    x >= xMin && x <= xMax && y >= yMin && y <= yMax;

  const testHit = (vectorX: number, vectorY: number): [boolean, number] => {
    let x = 0;
    let y = 0;
    let max = Number.MIN_SAFE_INTEGER;

    let overShoot = false;
    while (!overShoot) {
      x += vectorX;
      y += vectorY;

      vectorX = vectorX - Math.sign(vectorX);
      vectorY -= 1;

      if (y > max) {
        max = y;
      }

      if (x > xMax || y < yMin) {
        overShoot = true;
      } else if (isInTarget(x, y)) {
        return [true, max];
      }
    }

    return [false, -1];
  };

  let max = Number.MIN_SAFE_INTEGER;
  const xMaxVector = Math.max(Math.abs(xMin), Math.abs(xMax));
  const yMaxVector = Math.max(Math.abs(yMin), Math.abs(yMax)) * 12;

  for (let xVector = 0; xVector < xMaxVector; xVector++) {
    for (let yVector = 0; yVector < yMaxVector; yVector++) {
      const [hit, result] = testHit(xVector, yVector);
      if (hit && result > max) {
        max = result;
      }
    }
  }

  return max;
};

export const part2 = (
  [xMin, xMax]: [number, number],
  [yMin, yMax]: [number, number]
): number => {
  const isInTarget = (x: number, y: number): boolean =>
    x >= xMin && x <= xMax && y >= yMin && y <= yMax;

  const testHit = (vectorX: number, vectorY: number): boolean => {
    let x = 0;
    let y = 0;

    let overShoot = false;
    while (!overShoot) {
      x += vectorX;
      y += vectorY;

      vectorX = vectorX - Math.sign(vectorX);
      vectorY -= 1;

      if (x > xMax || y < yMin) {
        overShoot = true;
      } else if (isInTarget(x, y)) {
        return true;
      }
    }

    return false;
  };

  const xMaxVector = Math.max(Math.abs(xMin), Math.abs(xMax)) * 2;
  const yMaxVector = Math.max(Math.abs(yMin), Math.abs(yMax)) * 12;
  let counter = 0;

  for (let xVector = 0; xVector < xMaxVector; xVector++) {
    for (let yVector = yMin; yVector < yMaxVector; yVector++) {
      const hit = testHit(xVector, yVector);
      if (hit) {
        counter++;
      }
    }
  }

  return counter;
};
