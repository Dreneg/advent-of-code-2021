export const part1 = (input: string, iteration: number): number => {
  const [template, rules] = parseInput(input);
  let currentTemplate = template.split('');
  for (let index = 0; index < iteration; index++) {
    let newTemplate: string[] = [];
    for (let i = 0; i < currentTemplate.length; i += 1) {
      const rule = currentTemplate[i] + currentTemplate[i + 1];
      newTemplate.push(currentTemplate[i]);
      if (rules[rule]) {
        newTemplate.push(rules[rule]);
      }
    }
    currentTemplate = newTemplate;
  }
  const counters = currentTemplate.reduce(
    (total, value) => ({ ...total, [value]: 1 + (total[value] ?? 0) }),
    {} as Record<string, number>
  );
  const values = Object.values(counters);
  return Math.max(...values) - Math.min(...values);
};

export const part2 = (input: string, iteration: number): number => {
  const [template, rules] = parseInput(input);
  const counters: Record<string, number> = template
    .split('')
    .reduce(
      (total, value) => ({ ...total, [value]: (total[value] ?? 0) + 1 }),
      {} as Record<string, number>
    );
  const cache: Record<string, Record<string, number>> = {};

  for (let index = 0; index < template.length - 1; index++) {
    const newCounters = doCount(
      rules,
      [template[index], template[index + 1]],
      iteration,
      cache
    );

    const keys = new Set([
      ...Object.keys(counters),
      ...Object.keys(newCounters),
    ]);
    for (const key of keys) {
      counters[key] = (counters[key] ?? 0) + (newCounters[key] ?? 0);
    }
  }

  const values = Object.values(counters);
  return Math.max(...values) - Math.min(...values);
};

const doCount = (
  rules: Record<string, string>,
  [left, right]: [string, string],
  iteration: number,
  cache: Record<string, Record<string, number>>
): Record<string, number> => {
  if (iteration === 0) {
    return {};
  }
  if (cache[left + right + iteration]) {
    return { ...cache[left + right + iteration] };
  }

  const rule = rules[`${left}${right}`];
  const counters: Record<string, number> = {
    [rule]: 1,
  };
  const leftCounters = doCount(rules, [left, rule], iteration - 1, cache);
  const rightCounters = doCount(rules, [rule, right], iteration - 1, cache);

  const keys = new Set([
    ...Object.keys(counters),
    ...Object.keys(leftCounters),
    ...Object.keys(rightCounters),
  ]);
  for (const key of keys) {
    counters[key] =
      (counters[key] ?? 0) +
      (leftCounters[key] ?? 0) +
      (rightCounters[key] ?? 0);
  }

  cache[left + right + iteration] = counters;
  return counters;
};

const parseInput = (input: string): [string, Record<string, string>] => {
  const lines = input.split('\n');
  const template = lines[0].trim();
  const rules: Record<string, string> = {};
  for (let index = 2; index < lines.length; index++) {
    const [from, to] = lines[index].trim().split(' -> ');
    rules[from] = to;
  }
  return [template, rules];
};
