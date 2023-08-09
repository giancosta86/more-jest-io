import { stat } from "node:fs/promises";

async function hasStats(statsPredicate: StatsPredicate, path: string) {
  try {
    const pathStats = await stat(path);
    return statsPredicate(pathStats);
  } catch {
    return false;
  }
}

export async function toHaveStats(
  this: jest.MatcherContext,
  actualPath: string,
  statsPredicate: StatsPredicate
): Promise<jest.CustomMatcherResult> {
  const { matcherHint, printReceived } = this.utils;

  const pass = await hasStats(statsPredicate, actualPath);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint(".not.toHaveStats", "received", "") +
          "\n\n" +
          "Expected path not to satisfy the given predicate, received:\n" +
          `  ${printReceived(actualPath)}`
        : matcherHint(".toHaveStats", "received", "") +
          "\n\n" +
          "Expected path to satisfy the given predicate, received:\n" +
          `  ${printReceived(actualPath)}`
  };
}
