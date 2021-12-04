const BOARD_WIDTH = 5;

export const part1 = (
  steps: number[],
  flatBoards: number[]
): number | undefined => {
  const boards: number[][] = [];
  for (
    let index = 0;
    index < flatBoards.length;
    index = index + BOARD_WIDTH * BOARD_WIDTH
  ) {
    const board: number[] = [];
    for (let i = 0; i < BOARD_WIDTH * BOARD_WIDTH; i++) {
      board.push(flatBoards[index + i]);
    }
    boards.push(board);
    if (board.length !== BOARD_WIDTH * BOARD_WIDTH) {
      console.error('Board error');
    }
  }
  let min = Number.MAX_SAFE_INTEGER;

  let result: number | undefined;
  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    const board = boards[boardIndex];
    const markTable: boolean[] = Array.from(
      Array(BOARD_WIDTH * BOARD_WIDTH),
      () => false
    );

    for (let index = 0; index < steps.length; index++) {
      const step = steps[index];
      const stepIndex = board.findIndex((value) => step === value);
      if (stepIndex >= 0) {
        markTable[stepIndex] = true;
        if (isWinColumn(markTable) || isWinRow(markTable)) {
          const currentValue = calcBingo(markTable, board) * step;

          if (result === undefined || min > index) {
            min = index;
            result = currentValue;
          }

          break;
        }
      }
    }
  }

  return result || 0;
};

export const part2 = (
  steps: number[],
  flatBoards: number[]
): number | undefined => {
  const boards: number[][] = [];
  for (
    let index = 0;
    index < flatBoards.length;
    index = index + BOARD_WIDTH * BOARD_WIDTH
  ) {
    const board: number[] = [];
    for (let i = 0; i < BOARD_WIDTH * BOARD_WIDTH; i++) {
      board.push(flatBoards[index + i]);
    }
    boards.push(board);
    if (board.length !== BOARD_WIDTH * BOARD_WIDTH) {
      console.error('Board error');
    }
  }
  let max = Number.MIN_SAFE_INTEGER;

  let result: number | undefined;
  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    const board = boards[boardIndex];
    const markTable: boolean[] = Array.from(
      Array(BOARD_WIDTH * BOARD_WIDTH),
      () => false
    );

    for (let index = 0; index < steps.length; index++) {
      const step = steps[index];
      const stepIndex = board.findIndex((value) => step === value);
      if (stepIndex >= 0) {
        markTable[stepIndex] = true;
        if (isWinColumn(markTable) || isWinRow(markTable)) {
          const currentValue = calcBingo(markTable, board) * step;

          if (result === undefined || max < index) {
            max = index;
            result = currentValue;
          }

          break;
        }
      }
    }
  }

  return result || 0;
};

const calcBingo = (markTable: boolean[], board: number[]): number => {
  let result = 0;
  for (let index = 0; index < BOARD_WIDTH * BOARD_WIDTH; index++) {
    if (!markTable[index]) {
      result = result + board[index];
    }
  }
  return result;
};

const isWinColumn = (markTable: boolean[]): boolean => {
  for (let col = 0; col < BOARD_WIDTH; col++) {
    let marked = 0;
    for (let row = 0; row < BOARD_WIDTH; row++) {
      if (markTable[BOARD_WIDTH * row + col]) {
        marked = marked + 1;
      }
    }
    if (marked === BOARD_WIDTH) {
      return true;
    }
  }
  return false;
};

const isWinRow = (markTable: boolean[]): boolean => {
  for (let row = 0; row < BOARD_WIDTH; row++) {
    let marked = 0;
    for (let col = 0; col < BOARD_WIDTH; col++) {
      if (markTable[BOARD_WIDTH * row + col]) {
        marked = marked + 1;
      }
    }
    if (marked === BOARD_WIDTH) {
      return true;
    }
  }
  return false;
};
