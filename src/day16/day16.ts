export interface DecodedPacket {
  version: number;
  type: number;
  value?: number;
  subPackets?: DecodedPacket[];
  nextPosition: number;
}

interface ParsedPacket {
  value: number;
  position: number;
}

export const part1 = (input: string): number => {
  const bits = convertInput(input);

  const packets = reconstructPackets(bits);

  return sumVersions(packets);
};

export const part2 = (input: string): number => {
  const bits = convertInput(input);

  const packets = reconstructPackets(bits);

  fillValues(packets);

  return packets.value || 0;
};

export const reconstructPackets = (
  bits: number[],
  position = 0
): DecodedPacket => {
  let parsedPacket: ParsedPacket;

  parsedPacket = readBits(bits, position, 3);
  position = parsedPacket.position;
  const version = parsedPacket.value;

  parsedPacket = readBits(bits, position, 3);
  position = parsedPacket.position;
  const type = parsedPacket.value;

  if (type === 4) {
    parsedPacket = readLiteralValue(bits, position);
    position = parsedPacket.position;
    const value = parsedPacket.value;

    return {
      version,
      type,
      value,
      nextPosition: position,
    };
  } else {
    const operatorMode = bits[position];
    position += 1;

    const subDecodedPackets: DecodedPacket[] = [];
    if (operatorMode === 1) {
      parsedPacket = readBits(bits, position, 11);
      position = parsedPacket.position;
      const operatorLength = parsedPacket.value;

      for (let counter = 0; counter < operatorLength; counter++) {
        const subPacket = reconstructPackets(bits, position);
        position = subPacket.nextPosition;
        subDecodedPackets.push(subPacket);
      }
    } else {
      parsedPacket = readBits(bits, position, 15);
      position = parsedPacket.position;
      const operatorLength = parsedPacket.value;
      const startSubProductPosition = position;

      while (position < startSubProductPosition + operatorLength) {
        const subPacket = reconstructPackets(bits, position);
        position = subPacket.nextPosition;
        subDecodedPackets.push(subPacket);
      }
    }
    return {
      type,
      version,
      subPackets: subDecodedPackets,
      nextPosition: position,
    };
  }
};

const readBits = (
  bits: number[],
  position: number,
  length: number
): ParsedPacket => {
  let result = '';
  for (let index = 0; index < length; index++) {
    result += bits[position + index];
  }
  return { value: Number.parseInt(result, 2), position: position + length };
};

const readLiteralValue = (bits: number[], position: number): ParsedPacket => {
  let lastSubPacket = false;
  let literalValue = '';
  do {
    lastSubPacket = bits[position] === 0;
    for (let index = 1; index < 5; index++) {
      literalValue += bits[position + index];
    }
    position += 5;
  } while (!lastSubPacket);
  return {
    value: Number.parseInt(literalValue, 2),
    position,
  };
};

const sumVersions = (packet: DecodedPacket): number => {
  let result = 0;
  result += packet.version;
  for (const subPacket of packet.subPackets || []) {
    result += sumVersions(subPacket);
  }
  return result;
};

const fillValues = (packet: DecodedPacket) => {
  if (packet.value !== undefined) {
    return;
  }

  const type = packet.type;
  const subPackets = packet.subPackets ?? [];

  switch (type) {
    case 0:
      let sum = 0;
      for (const subPacket of subPackets) {
        fillValues(subPacket);
        sum += subPacket.value ?? 0;
      }
      packet.value = sum;
      break;
    case 1:
      let product = 1;
      for (const subPacket of subPackets) {
        fillValues(subPacket);
        product *= subPacket.value ?? 0;
      }
      packet.value = product;
      break;
    case 2:
      let min = Number.MAX_SAFE_INTEGER;
      for (const subPacket of subPackets) {
        fillValues(subPacket);

        const value = subPacket.value ?? 0;

        if (value < min) {
          min = value;
        }
      }
      packet.value = min;
      break;
    case 3:
      let max = Number.MIN_SAFE_INTEGER;
      for (const subPacket of subPackets) {
        fillValues(subPacket);

        const value = subPacket.value ?? 0;

        if (value > max) {
          max = value;
        }
      }
      packet.value = max;
      break;
    case 5:
      fillValues(subPackets[0]);
      fillValues(subPackets[1]);
      packet.value =
        (subPackets[0].value ?? 0) > (subPackets[1].value ?? 0) ? 1 : 0;
      break;
    case 6:
      fillValues(subPackets[0]);
      fillValues(subPackets[1]);
      packet.value =
        (subPackets[0].value ?? 0) < (subPackets[1].value ?? 0) ? 1 : 0;
      break;
    case 7:
      fillValues(subPackets[0]);
      fillValues(subPackets[1]);
      packet.value =
        (subPackets[0].value ?? 0) === (subPackets[1].value ?? 0) ? 1 : 0;
      break;

    case 4:
    default:
      throw Error('invalid type');
  }
};

function convertInput(input: string) {
  return input
    .split('')
    .map((hex) => Number.parseInt(hex, 16))
    .map((dec) => (dec >>> 0).toString(2))
    .map((binString) => binString.padStart(4, '0'))
    .join('')
    .split('')
    .map((bin) => +bin);
}
