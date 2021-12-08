export const part1 = (input: number[]): number => {
  let [min, max] = findMinMax(input);
  let result = Number.MAX_SAFE_INTEGER;

  for (let target = min; target <= max; target++) {
    const distance = calcDistance(input, target);
    if (distance < result) {
      result = distance;
    }
  }

  return result;
};

export const part2 = (input: number[]): number => {
  let [min, max] = findMinMax(input);
  let result = Number.MAX_SAFE_INTEGER;

  for (let target = min; target <= max; target++) {
    const distance = calcDistance2(input, target);
    if (distance < result) {
      result = distance;
    }
  }

  return result;
};

const findMinMax = (input: number[]): [number, number] => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  for (let num of input) {
    if (num > max) {
      max = num;
    }
    if (num < min) {
      min = num;
    }
  }
  return [min, max];
};

const calcDistance = (input: number[], target: number): number => {
  let result = 0;
  for (let num of input) {
    result += Math.abs(target - num);
  }
  return result;
};

const calcDistance2 = (input: number[], target: number): number => {
  let result = 0;
  for (let num of input) {
    result += sumUp(Math.abs(target - num));
  }
  return result;
};

const sumUp = (num: number) => {
  let result = 0;
  for (let x = 1; x <= num; x++) {
    result += x;
  }
  return result;
};
