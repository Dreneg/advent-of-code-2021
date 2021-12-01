export const part1 = (input: number[]): number => {
  let result = 0;
  let prev;
  for (let index = 0; index < input.length; index++) {
    if (prev !== undefined && prev < input[index]) {
      result += 1;
    }
    prev = input[index];
  }

  return result;
};

export const part2 = (input: number[]): number => {
  const summedInput = [];
  for (let index = 0; index < input.length - 2; index++) {
    summedInput.push(input[index] + input[index + 1] + input[index + 2]);
  }
  return part1(summedInput);
};
