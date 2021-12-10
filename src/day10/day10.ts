const pairs = new Map<string, string>();
pairs.set('(', ')');
pairs.set('[', ']');
pairs.set('<', '>');
pairs.set('{', '}');

const opens = [...pairs.keys()];

export const part1 = (input: string): number => {
  let result = 0;
  for (const line of input.split('\n')) {
    const openBrackets: string[] = [];
    const chars = line.trim().split('');
    for (const c of chars) {
      if (opens.includes(c)) {
        openBrackets.push(c);
      } else {
        const openC = openBrackets.pop();
        if (!openC || pairs.get(openC) !== c) {
          result += getClosingValue1(c);
        }
      }
    }
  }
  return result;
};

const getClosingValue1 = (c: string): number => {
  switch (c) {
    case ')':
      return 3;
    case ']':
      return 57;
    case '}':
      return 1197;
    case '>':
      return 25137;
    default:
      return 0;
  }
};

export const part2 = (input: string): number => {
  const scores: number[] = [];
  for (const line of input.split('\n')) {
    const openBrackets: string[] = [];
    const chars = line.trim().split('');
    let currupted = false;
    for (const c of chars) {
      if (opens.includes(c)) {
        openBrackets.push(c);
      } else {
        const openC = openBrackets.pop();
        if (!openC || pairs.get(openC) !== c) {
          currupted = true;
          break;
        }
      }
    }
    if (!currupted && openBrackets.length > 0) {
      let score = 0;
      while (openBrackets.length > 0) {
        const openC = openBrackets.pop();
        if (openC) {
          score = score * 5 + getOpeningValue2(openC);
        }
      }
      scores.push(score);
    }
  }
  const result = scores.sort((b, a) => b - a)[(scores.length - 1) / 2];
  return result;
};

const getOpeningValue2 = (c: string): number => {
  switch (c) {
    case '(':
      return 1;
    case '[':
      return 2;
    case '{':
      return 3;
    case '<':
      return 4;
    default:
      return 0;
  }
};
