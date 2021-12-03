export const part1 = (input: string[]): number => {
  const digitOne: number[] = [];

  input.forEach((num) => {
    for (let charIndex = 0; charIndex <= num.length; charIndex++) {
      if (num.charAt(charIndex) === '1') {
        digitOne[charIndex] = (digitOne[charIndex] || 0) + 1;
      }
    }
  });

  let gamma = '';
  let epsilon = '';
  for (let index = 0; index < digitOne.length; index++) {
    if (digitOne[index] > input.length - digitOne[index]) {
      gamma = gamma + '1';
      epsilon = epsilon + '0';
    } else {
      gamma = gamma + '0';
      epsilon = epsilon + '1';
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

export const part2 = (input: string[]): number => {
  let o2: number | undefined;
  let co2: number | undefined;
  let index = 0;

  let [o2Array, co2Array] = splitByBitFrequency(input, index);
  do {
    if (o2Array.length === 1) {
      o2 = parseInt(o2Array[0], 2);
    }

    if (co2Array.length === 1) {
      co2 = parseInt(co2Array[0], 2);
    }

    index = index + 1;
    o2Array = splitByBitFrequency(o2Array, index)[0];
    co2Array = splitByBitFrequency(co2Array, index)[1];
  } while (o2 === undefined || co2 === undefined);

  return (o2 ?? 1) * (co2 ?? 1);
};

const splitByBitFrequency = (
  input: string[],
  position: number
): [string[], string[]] => {
  const digitOne: string[] = [];
  const digitZero: string[] = [];

  for (let index = 0; index < input.length; index++) {
    if (input[index].charAt(position) === '1') {
      digitOne.push(input[index]);
    } else {
      digitZero.push(input[index]);
    }
  }

  return digitOne.length >= digitZero.length
    ? [digitOne, digitZero]
    : [digitZero, digitOne];
};
