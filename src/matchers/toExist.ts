import { stat } from "node:fs/promises";

async function pathExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function toExist(
  this: jest.MatcherContext,
  actualPath: string
): Promise<jest.CustomMatcherResult> {
  const { matcherHint, printReceived } = this.utils;

  const pass = await pathExists(actualPath);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint(".not.toExist", "received", "") +
          "\n\n" +
          "Expected path not to exist, received:\n" +
          `  ${printReceived(actualPath)}`
        : matcherHint(".toExist", "received", "") +
          "\n\n" +
          "Expected path to exist, received:\n" +
          `  ${printReceived(actualPath)}`
  };
}
