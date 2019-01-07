export type Procedure = (...args: any[]) => void;

export type Options = {
  isImmediate: boolean;
};

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false
  }
): F {
  let timeoutId: NodeJS.Timeout | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    const doLater = function() {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any;
}

export const getStatBonus = (statValue: any) => {
  if (typeof statValue === "string") {
    statValue = parseInt(statValue);
  }

  if (statValue >= 30) return 10;
  else if (statValue >= 28) return 9;
  else if (statValue >= 26) return 8;
  else if (statValue >= 24) return 7;
  else if (statValue >= 22) return 6;
  else if (statValue >= 20) return 5;
  else if (statValue >= 18) return 4;
  else if (statValue >= 16) return 3;
  else if (statValue >= 14) return 2;
  else if (statValue >= 12) return 1;
  else if (statValue >= 10) return 0;
  else if (statValue >= 8) return -1;
  else if (statValue >= 6) return -2;
  else if (statValue >= 4) return -3;
  else if (statValue >= 2) return -4;
  else if (statValue >= 0) return -5;
};
