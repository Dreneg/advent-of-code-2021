import { part1, part2 } from './day17';

describe('day17', () => {
  describe('part1', () => {
    it('example data', () => {
      const result = part1([20, 30], [-10, -5]);

      expect(result).toBe(45);
    });

    it('example data', () => {
      const result = part1([70, 96], [-179, -124]);

      expect(result).toBe(15931);
    });
  });

  describe('part2', () => {
    it('example data', () => {
      const result = part2([20, 30], [-10, -5]);

      expect(result).toBe(112);
    });

    it('example data', () => {
      const result = part2([70, 96], [-179, -124]);

      expect(result).toBe(2555);
    });
  });
});
