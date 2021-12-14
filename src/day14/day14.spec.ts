import { part1, part2 } from './day14';

describe('day14', () => {
  describe('part1', () => {
    it('example data', () => {
      const input = `NNCB

      CH -> B
      HH -> N
      CB -> H
      NH -> C
      HB -> C
      HC -> B
      HN -> C
      NN -> C
      BH -> H
      NC -> B
      NB -> B
      BN -> B
      BB -> N
      BC -> B
      CC -> N
      CN -> C`;

      const result = part1(input, 10);

      expect(result).toBe(1588);
    });

    it('my data', () => {
      const input = `SHHBNFBCKNHCNOSHHVFF

      CK -> N
      VP -> B
      CF -> S
      FO -> V
      VC -> S
      BV -> V
      NP -> P
      SN -> C
      KN -> V
      NF -> P
      SB -> C
      PC -> B
      OB -> V
      NS -> O
      FH -> S
      NK -> S
      HO -> V
      NV -> O
      FV -> O
      FB -> S
      PS -> S
      FN -> K
      HS -> O
      CB -> K
      HV -> P
      NH -> C
      BO -> B
      FF -> N
      PO -> F
      BB -> N
      PN -> C
      BP -> C
      HN -> K
      CO -> P
      BF -> H
      BC -> S
      CV -> B
      VV -> F
      FS -> B
      BN -> P
      VK -> S
      PV -> V
      PP -> B
      PH -> N
      SS -> O
      SK -> S
      NC -> P
      ON -> F
      NB -> N
      CC -> N
      SF -> H
      PF -> H
      OV -> O
      KH -> C
      CP -> V
      PK -> O
      KC -> K
      KK -> C
      KF -> B
      HP -> C
      FK -> H
      BH -> K
      VN -> H
      OO -> S
      SC -> K
      SP -> B
      KO -> V
      KV -> F
      HK -> N
      FP -> N
      NN -> B
      VS -> O
      HC -> K
      BK -> N
      KS -> K
      VB -> O
      OH -> F
      KB -> F
      KP -> H
      HB -> N
      NO -> N
      OF -> O
      BS -> H
      VO -> H
      SH -> O
      SV -> K
      HF -> C
      CS -> F
      FC -> N
      VH -> H
      OP -> K
      OK -> H
      PB -> K
      HH -> S
      OC -> V
      VF -> B
      CH -> K
      CN -> C
      SO -> P
      OS -> O`;

      const result = part1(input, 10);

      expect(result).toBe(2223);
    });

    it('example data 40', () => {
      const input = `NNCB

      CH -> B
      HH -> N
      CB -> H
      NH -> C
      HB -> C
      HC -> B
      HN -> C
      NN -> C
      BH -> H
      NC -> B
      NB -> B
      BN -> B
      BB -> N
      BC -> B
      CC -> N
      CN -> C`;

      const result = part2(input, 40);

      expect(result).toBe(2188189693529);
    });

    it('my data', () => {
      const input = `SHHBNFBCKNHCNOSHHVFF

      CK -> N
      VP -> B
      CF -> S
      FO -> V
      VC -> S
      BV -> V
      NP -> P
      SN -> C
      KN -> V
      NF -> P
      SB -> C
      PC -> B
      OB -> V
      NS -> O
      FH -> S
      NK -> S
      HO -> V
      NV -> O
      FV -> O
      FB -> S
      PS -> S
      FN -> K
      HS -> O
      CB -> K
      HV -> P
      NH -> C
      BO -> B
      FF -> N
      PO -> F
      BB -> N
      PN -> C
      BP -> C
      HN -> K
      CO -> P
      BF -> H
      BC -> S
      CV -> B
      VV -> F
      FS -> B
      BN -> P
      VK -> S
      PV -> V
      PP -> B
      PH -> N
      SS -> O
      SK -> S
      NC -> P
      ON -> F
      NB -> N
      CC -> N
      SF -> H
      PF -> H
      OV -> O
      KH -> C
      CP -> V
      PK -> O
      KC -> K
      KK -> C
      KF -> B
      HP -> C
      FK -> H
      BH -> K
      VN -> H
      OO -> S
      SC -> K
      SP -> B
      KO -> V
      KV -> F
      HK -> N
      FP -> N
      NN -> B
      VS -> O
      HC -> K
      BK -> N
      KS -> K
      VB -> O
      OH -> F
      KB -> F
      KP -> H
      HB -> N
      NO -> N
      OF -> O
      BS -> H
      VO -> H
      SH -> O
      SV -> K
      HF -> C
      CS -> F
      FC -> N
      VH -> H
      OP -> K
      OK -> H
      PB -> K
      HH -> S
      OC -> V
      VF -> B
      CH -> K
      CN -> C
      SO -> P
      OS -> O`;

      const result = part2(input, 40);

      expect(result).toBe(2566282754493);
    });
  });
});
