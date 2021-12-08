export const part1 = (input: string): number => {
  const lines = input.split('\n');
  let result = 0;
  for (let line of lines) {
    const output = line.split('|')[1];
    const outputValues = output.split(' ');
    for (let outputValue of outputValues) {
      if (
        outputValue.length === 2 ||
        outputValue.length === 3 ||
        outputValue.length === 4 ||
        outputValue.length === 7
      ) {
        result += 1;
      }
    }
  }
  return result;
};

export const part2 = (input: string): number => {
  const lines = input.split('\n');
  let result = 0;
  for (let line of lines) {
    const [inputValues, outputValues] = splitLine(line);
    const decoder = decode(inputValues);
    const orderedValues = outputValues.map((value) =>
      value.split('').sort().join('')
    );
    const thousand = decoder.findIndex((v) => v === orderedValues[0]) * 1000;
    const hundred = decoder.findIndex((v) => v === orderedValues[1]) * 100;
    const ten = decoder.findIndex((v) => v === orderedValues[2]) * 10;
    const one = decoder.findIndex((v) => v === orderedValues[3]);
    result += thousand + hundred + ten + one;
  }
  return result;
};

const splitLine = (line: string): [string[], string[]] => {
  const input = line.split('|')[0];
  const output = line.split('|')[1];
  const inputValues = input.split(' ');
  const outputValues = output.split(' ').filter((v) => v.length > 0);
  return [inputValues, outputValues];
};

const decode = (inputValues: string[]): string[] => {
  const decoded: string[] = Array(10).fill(undefined);
  let unknownValues = inputValues
    .map((value) => value.split('').sort().join(''))
    .filter((v) => v.length > 0);

  // decode trivial cases
  for (let value of unknownValues) {
    if (value.length == 2) {
      decoded[1] = value;
    }
    if (value.length == 4) {
      decoded[4] = value;
    }
    if (value.length == 3) {
      decoded[7] = value;
    }
    if (value.length == 7) {
      decoded[8] = value;
    }
  }
  unknownValues = unknownValues.filter((value) => !decoded.includes(value));

  for (let value of unknownValues) {
    const fourDigits = decoded[4].split('');
    if (value.length === 6 && isIncludeAll(value, fourDigits)) {
      decoded[9] = value;
      break;
    }
  }

  unknownValues = unknownValues.filter((value) => !decoded.includes(value));

  const oneDigits = decoded[1].split('');
  for (let value of unknownValues) {
    if (value.length === 6 && includeOne(value, oneDigits)) {
      decoded[6] = value;
      break;
    }
  }

  unknownValues = unknownValues.filter((value) => !decoded.includes(value));

  for (let value of unknownValues) {
    if (value.length === 6) {
      decoded[0] = value;
      break;
    }
  }

  unknownValues = unknownValues.filter((value) => !decoded.includes(value));

  const complementNine = complement(decoded[9]);
  const possibleFive = decoded[6]
    .split('')
    .filter((v) => !complementNine.includes(v))
    .join('');
  for (let value of unknownValues) {
    if (value.length === 5 && possibleFive === value) {
      decoded[5] = value;
      break;
    }
  }

  unknownValues = unknownValues.filter((value) => !decoded.includes(value));

  const complementZero = complement(decoded[0]);
  const five = decoded[5].split('');
  const four = decoded[4].split('');
  const one = decoded[1].split('');
  const possibleThree = [
    ...new Set([
      ...five.filter((v) => !four.includes(v)),
      ...one,
      ...complementZero,
    ]),
  ]
    .sort()
    .join('');

  for (let value of unknownValues) {
    if (value.length === 5 && value === possibleThree) {
      decoded[3] = value;
      break;
    }
  }

  unknownValues = unknownValues.filter((value) => !decoded.includes(value));

  for (let value of unknownValues) {
    if (value.length === 5) {
      decoded[2] = value;
      break;
    }
  }

  return decoded;
};

const includeOne = (value: string, digits: string[]): boolean => {
  let counter = 0;
  for (let digit of value.split('')) {
    if (digits.includes(digit)) {
      counter += 1;
    }
  }
  return counter === 1;
};

const complement = (value: string): string[] => {
  const digits = value.split('');
  return ['a', 'b', 'c', 'd', 'e', 'f', 'g'].filter((v) => !digits.includes(v));
};

const isIncludeAll = (value: string, digits: string[]): boolean => {
  for (const digit of digits) {
    if (value.indexOf(digit) < 0) return false;
  }
  return true;
};
