import { Stats } from "node:fs";
import { stat } from "node:fs/promises";
import { MatcherContext } from "expect";
import { MatcherResult, failMatcherIf } from "@giancosta86/more-jest";

export async function toHaveStats(
  this: MatcherContext,
  receivedPath: string,
  statsPredicate: StatsPredicate
): Promise<MatcherResult> {
  let pathStats: Stats;

  try {
    pathStats = await stat(receivedPath);
  } catch {
    return {
      pass: false,
      message: () =>
        `${this.utils.printReceived(
          receivedPath
        )} does not exist in the file system`
    };
  }

  return failMatcherIf(
    !statsPredicate(pathStats),
    () =>
      `Failed stats predicate for ${this.utils.printReceived(receivedPath)}\n\n`
  );
}
