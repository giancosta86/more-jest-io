import { readFile } from "node:fs/promises";

interface IsTextFileParams {
  path: string;
  expectedText: string;
  options?: ToBeTextFileOptions;
}

async function isTextFile({
  path,
  expectedText,
  options
}: IsTextFileParams): Promise<boolean> {
  const encoding = options?.encoding ?? "utf8";

  const actualText = await readFile(path, { encoding });

  return actualText == expectedText;
}

export async function toBeTextFile(
  this: jest.MatcherContext,
  actualPath: string,
  expectedText: string,
  options?: ToBeTextFileOptions
): Promise<jest.CustomMatcherResult> {
  const { printReceived, matcherHint } = this.utils;

  const pass = await isTextFile({ path: actualPath, expectedText, options });

  return {
    pass,
    message: () =>
      pass
        ? matcherHint(".not.toBeTextFile", "received", "") +
          "\n\n" +
          "Expected not to find the given text in path:\n" +
          `  ${printReceived(actualPath)}`
        : matcherHint(".toBeTextFile", "received", "") +
          "\n\n" +
          "Expected to find the given text in path:\n" +
          `  ${printReceived(actualPath)}`
  };
}
