import { stat } from "node:fs/promises";
import { MatcherContext } from "expect";
import { MatcherResult, matcherSuccess } from "@giancosta86/more-jest";

export async function toExist(
  this: MatcherContext,
  receivedPath: string
): Promise<MatcherResult> {
  try {
    await stat(receivedPath);
  } catch {
    return {
      pass: false,
      message: () =>
        `${this.utils.printReceived(
          receivedPath
        )} does not exist in the file system`
    };
  }

  return matcherSuccess;
}
