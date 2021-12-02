export const part1 = (input: string[]): number => {
  let depth = 0;
  let horizontal = 0;

  input.forEach((movement) => {
    const [direction, size] = movement.split(' ');
    if (direction === 'forward') {
      horizontal = horizontal + +size;
    } else if (direction === 'up') {
      depth = depth - +size;
    } else {
      depth = depth + +size;
    }
  });

  return depth * horizontal;
};

export const part2 = (input: string[]): number => {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  input.forEach((movement) => {
    const [direction, size] = movement.split(' ');
    if (direction === 'forward') {
      horizontal = horizontal + +size;
      depth = depth + aim * +size;
    } else if (direction === 'up') {
      aim = aim - +size;
    } else {
      aim = aim + +size;
    }
  });

  return depth * horizontal;
};
