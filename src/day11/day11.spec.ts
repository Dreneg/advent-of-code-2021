import { part1, part2 } from './day11';

describe('day11', () => {
  describe('part1', () => {
    it('example data', () => {
      const input = `5483143223
      2745854711
      5264556173
      6141336146
      6357385478
      4167524645
      2176841721
      6882881134
      4846848554
      5283751526`;

      const result = part1(input, 100);

      expect(result).toBe(1656);
    });

    it('my data', () => {
      const input = `6227618536
      2368158384
      5385414113
      4556757523
      6746486724
      4881323884
      4648263744
      4871332872
      4724128228
      4316512167`;

      const result = part1(input, 100);

      expect(result).toBe(1681);
    });
  });

  describe('part2', () => {
    it('example data', () => {
      const input = `5483143223
      2745854711
      5264556173
      6141336146
      6357385478
      4167524645
      2176841721
      6882881134
      4846848554
      5283751526`;

      const result = part2(input);

      expect(result).toBe(195);
    });

    it('my data', () => {
      const input = `6227618536
      2368158384
      5385414113
      4556757523
      6746486724
      4881323884
      4648263744
      4871332872
      4724128228
      4316512167`;

      const result = part2(input);

      expect(result).toBe(276);
    });
  });
});
