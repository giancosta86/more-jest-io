import { readFile } from "node:fs/promises";
import { MatcherContext } from "expect";
import { MatcherResult, failMatcherIf } from "@giancosta86/more-jest";

export async function toBeTextFile(
  this: MatcherContext,
  receivedFilePath: string,
  expectedText: string,
  options?: ToBeTextFileOptions
): Promise<MatcherResult> {
  const encoding = options?.encoding ?? "utf8";

  const actualText = await readFile(receivedFilePath, { encoding });

  return failMatcherIf(
    actualText != expectedText,

    () =>
      `Expected text content for file '${receivedFilePath}': ${this.utils.printExpected(
        expectedText
      )}\nReceived: ${this.utils.printReceived(actualText)}\n\n`
  );
}
