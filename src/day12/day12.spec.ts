import { part1, part2 } from './day12';

describe('day12', () => {
  describe('part1', () => {
    it('example data 1', () => {
      const input = `start-A
      start-b
      A-c
      A-b
      b-d
      A-end
      b-end`;

      const result = part1(input);

      expect(result).toBe(10);
    });

    it('example data 2', () => {
      const input = `dc-end
      HN-start
      start-kj
      dc-start
      dc-HN
      LN-dc
      HN-end
      kj-sa
      kj-HN
      kj-dc`;

      const result = part1(input);

      expect(result).toBe(19);
    });

    it('example data 3', () => {
      const input = `fs-end
      he-DX
      fs-he
      start-DX
      pj-DX
      end-zg
      zg-sl
      zg-pj
      pj-he
      RW-he
      fs-DX
      pj-RW
      zg-RW
      start-pj
      he-WI
      zg-he
      pj-fs
      start-RW`;

      const result = part1(input);

      expect(result).toBe(226);
    });

    it('my data', () => {
      const input = `EG-bj
      LN-end
      bj-LN
      yv-start
      iw-ch
      ch-LN
      EG-bn
      OF-iw
      LN-yv
      iw-TQ
      iw-start
      TQ-ch
      EG-end
      bj-OF
      OF-end
      TQ-start
      TQ-bj
      iw-LN
      EG-ch
      yv-iw
      KW-bj
      OF-ch
      bj-ch
      yv-TQ`;

      const result = part1(input);

      expect(result).toBe(4659);
    });
  });

  describe('part2', () => {
    it('example data 1', () => {
      const input = `start-A
      start-b
      A-c
      A-b
      b-d
      A-end
      b-end`;

      const result = part2(input);

      expect(result).toBe(36);
    });

    it('example data 2', () => {
      const input = `dc-end
      HN-start
      start-kj
      dc-start
      dc-HN
      LN-dc
      HN-end
      kj-sa
      kj-HN
      kj-dc`;

      const result = part2(input);

      expect(result).toBe(103);
    });

    it('example data 3', () => {
      const input = `fs-end
      he-DX
      fs-he
      start-DX
      pj-DX
      end-zg
      zg-sl
      zg-pj
      pj-he
      RW-he
      fs-DX
      pj-RW
      zg-RW
      start-pj
      he-WI
      zg-he
      pj-fs
      start-RW`;

      const result = part2(input);

      expect(result).toBe(3509);
    });

    it('my data', () => {
      const input = `EG-bj
      LN-end
      bj-LN
      yv-start
      iw-ch
      ch-LN
      EG-bn
      OF-iw
      LN-yv
      iw-TQ
      iw-start
      TQ-ch
      EG-end
      bj-OF
      OF-end
      TQ-start
      TQ-bj
      iw-LN
      EG-ch
      yv-iw
      KW-bj
      OF-ch
      bj-ch
      yv-TQ`;

      const result = part2(input);

      expect(result).toBe(148962);
    });
  });
});
