import { part1, part2, reconstructPackets } from './day16';

describe('day16', () => {
  it('reconstructPackets 0', () => {
    const result = reconstructPackets('11010001000'.split('').map((x) => +x));

    expect(result).toEqual({
      version: 6,
      type: 4,
      value: 8,
      nextPosition: 11,
    });
  });

  it('reconstructPackets 1', () => {
    const result = reconstructPackets(
      '110100101111111000101000'.split('').map((x) => +x)
    );

    expect(result).toEqual({
      version: 6,
      type: 4,
      value: 2021,
      nextPosition: 21,
    });
  });

  it('reconstructPackets 2', () => {
    const result = reconstructPackets(
      '00111000000000000110111101000101001010010001001000000000'
        .split('')
        .map((x) => +x)
    );

    expect(result).toEqual({
      version: 1,
      type: 6,
      nextPosition: 49,
      subPackets: [
        {
          nextPosition: 33,
          version: 6,
          type: 4,
          value: 10,
        },
        {
          nextPosition: 49,
          version: 2,
          type: 4,
          value: 20,
        },
      ],
    });
  });

  it('reconstructPackets 3', () => {
    const result = reconstructPackets(
      '11101110000000001101010000001100100000100011000001100000'
        .split('')
        .map((x) => +x)
    );

    expect(result).toEqual({
      version: 7,
      type: 3,
      nextPosition: 51,
      subPackets: [
        { version: 2, type: 4, value: 1, nextPosition: 29 },
        { version: 4, type: 4, value: 2, nextPosition: 40 },
        { version: 1, type: 4, value: 3, nextPosition: 51 },
      ],
    });
  });

  describe('part1', () => {
    it('example data 0', () => {
      const input = `D2FE28`;

      const result = part1(input);

      expect(result).toBe(6);
    });

    it('example data 1', () => {
      const input = `8A004A801A8002F478`;

      const result = part1(input);

      expect(result).toBe(16);
    });

    it('example data 2', () => {
      const input = `620080001611562C8802118E34`;

      const result = part1(input);

      expect(result).toBe(12);
    });
    it('example data 3', () => {
      const input = `C0015000016115A2E0802F182340`;

      const result = part1(input);

      expect(result).toBe(23);
    });
    it('example data 4', () => {
      const input = `A0016C880162017C3686B18A3D4780`;

      const result = part1(input);

      expect(result).toBe(31);
    });

    it('my data', () => {
      const input = `E20D79005573F71DA0054E48527EF97D3004653BB1FC006867A8B1371AC49C801039171941340066E6B99A6A58B8110088BA008CE6F7893D4E6F7893DCDCFDB9D6CBC4026FE8026200DC7D84B1C00010A89507E3CCEE37B592014D3C01491B6697A83CB4F59E5E7FFA5CC66D4BC6F05D3004E6BB742B004E7E6B3375A46CF91D8C027911797589E17920F4009BE72DA8D2E4523DCEE86A8018C4AD3C7F2D2D02C5B9FF53366E3004658DB0012A963891D168801D08480485B005C0010A883116308002171AA24C679E0394EB898023331E60AB401294D98CA6CD8C01D9B349E0A99363003E655D40289CBDBB2F55D25E53ECAF14D9ABBB4CC726F038C011B0044401987D0BE0C00021B04E2546499DE824C015B004A7755B570013F2DD8627C65C02186F2996E9CCD04E5718C5CBCC016B004A4F61B27B0D9B8633F9344D57B0C1D3805537ADFA21F231C6EC9F3D3089FF7CD25E5941200C96801F191C77091238EE13A704A7CCC802B3B00567F192296259ABD9C400282915B9F6E98879823046C0010C626C966A19351EE27DE86C8E6968F2BE3D2008EE540FC01196989CD9410055725480D60025737BA1547D700727B9A89B444971830070401F8D70BA3B8803F16A3FC2D00043621C3B8A733C8BD880212BCDEE9D34929164D5CB08032594E5E1D25C0055E5B771E966783240220CD19E802E200F4588450BC401A8FB14E0A1805B36F3243B2833247536B70BDC00A60348880C7730039400B402A91009F650028C00E2020918077610021C00C1002D80512601188803B4000C148025010036727EE5AD6B445CC011E00B825E14F4BBF5F97853D2EFD6256F8FFE9F3B001420C01A88915E259002191EE2F4392004323E44A8B4C0069CEF34D304C001AB94379D149BD904507004A6D466B618402477802E200D47383719C0010F8A507A294CC9C90024A967C9995EE2933BA840`;

      const result = part1(input);

      expect(result).toBe(951);
    });
  });

  describe('part2', () => {
    it('example data: sum', () => {
      const input = `C200B40A82`;

      const result = part2(input);

      expect(result).toBe(3);
    });

    it('example data: product', () => {
      const input = `04005AC33890`;

      const result = part2(input);

      expect(result).toBe(54);
    });

    it('example data: min', () => {
      const input = `880086C3E88112`;

      const result = part2(input);

      expect(result).toBe(7);
    });
    it('example data: max', () => {
      const input = `CE00C43D881120`;

      const result = part2(input);

      expect(result).toBe(9);
    });
    it('example data: less', () => {
      const input = `D8005AC2A8F0`;

      const result = part2(input);

      expect(result).toBe(1);
    });

    it('example data: greater', () => {
      const input = `F600BC2D8F`;

      const result = part2(input);

      expect(result).toBe(0);
    });

    it('example data: equal', () => {
      const input = `9C005AC2F8F0`;

      const result = part2(input);

      expect(result).toBe(0);
    });

    it('example data complex', () => {
      const input = `9C0141080250320F1802104A08`;

      const result = part2(input);

      expect(result).toBe(1);
    });

    it('my data', () => {
      const input = `E20D79005573F71DA0054E48527EF97D3004653BB1FC006867A8B1371AC49C801039171941340066E6B99A6A58B8110088BA008CE6F7893D4E6F7893DCDCFDB9D6CBC4026FE8026200DC7D84B1C00010A89507E3CCEE37B592014D3C01491B6697A83CB4F59E5E7FFA5CC66D4BC6F05D3004E6BB742B004E7E6B3375A46CF91D8C027911797589E17920F4009BE72DA8D2E4523DCEE86A8018C4AD3C7F2D2D02C5B9FF53366E3004658DB0012A963891D168801D08480485B005C0010A883116308002171AA24C679E0394EB898023331E60AB401294D98CA6CD8C01D9B349E0A99363003E655D40289CBDBB2F55D25E53ECAF14D9ABBB4CC726F038C011B0044401987D0BE0C00021B04E2546499DE824C015B004A7755B570013F2DD8627C65C02186F2996E9CCD04E5718C5CBCC016B004A4F61B27B0D9B8633F9344D57B0C1D3805537ADFA21F231C6EC9F3D3089FF7CD25E5941200C96801F191C77091238EE13A704A7CCC802B3B00567F192296259ABD9C400282915B9F6E98879823046C0010C626C966A19351EE27DE86C8E6968F2BE3D2008EE540FC01196989CD9410055725480D60025737BA1547D700727B9A89B444971830070401F8D70BA3B8803F16A3FC2D00043621C3B8A733C8BD880212BCDEE9D34929164D5CB08032594E5E1D25C0055E5B771E966783240220CD19E802E200F4588450BC401A8FB14E0A1805B36F3243B2833247536B70BDC00A60348880C7730039400B402A91009F650028C00E2020918077610021C00C1002D80512601188803B4000C148025010036727EE5AD6B445CC011E00B825E14F4BBF5F97853D2EFD6256F8FFE9F3B001420C01A88915E259002191EE2F4392004323E44A8B4C0069CEF34D304C001AB94379D149BD904507004A6D466B618402477802E200D47383719C0010F8A507A294CC9C90024A967C9995EE2933BA840`;

      const result = part2(input);

      expect(result).toBe(902198718880);
    });
  });
});
