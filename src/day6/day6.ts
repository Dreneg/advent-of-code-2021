export const part1 = (input: number[], days = 80) => {
  const fishes: number[] = Array(9).fill(0);

  for (let index of input) {
    fishes[index] = fishes[index] + 1;
  }

  for (let day = 0; day < days; day++) {
    const fish = fishes.shift() ?? 0;
    fishes[8] = fish;
    fishes[6] = fishes[6] + fish;
  }

  return fishes.reduce((total, value) => total + value, 0);
};
