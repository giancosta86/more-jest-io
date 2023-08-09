import { join } from "node:path";
import { getSourceDirectory } from "../utils";

const scenarios = [
  {
    encoding: "utf8" as BufferEncoding,
    expectedText: "Alpha\nBeta"
  },

  {
    encoding: "latin1" as BufferEncoding,
    expectedText: "Je préférérais une fenêtre."
  }
];

function getEncodedTestFilePath(encoding: string): string {
  const testDirectory = join(getSourceDirectory(), "test");
  return join(testDirectory, `${encoding}.txt`);
}

describe(".toBeTextFile", () => {
  it.each(scenarios)(
    "passes when comparing $encoding-encoded file with matching content",
    async ({ encoding, expectedText }) => {
      const testFilePath = getEncodedTestFilePath(encoding);

      await expect(testFilePath).toBeTextFile(expectedText, {
        encoding
      });
    }
  );

  it.each(scenarios)(
    "fails when comparing $encoding-encoded file with inexisting content",
    async ({ encoding }) => {
      const testFilePath = getEncodedTestFilePath(encoding);

      await expect(
        expect(testFilePath).toBeTextFile("<<INEXISTING>>", {
          encoding
        })
      ).rejects.toThrow("Expected to find the given text in path");
    }
  );
});

describe(".not.toBeTextFile", () => {
  it.each(scenarios)(
    "fails when comparing $encoding-encoded file with its content",
    async ({ expectedText, encoding }) => {
      const testFilePath = getEncodedTestFilePath(encoding);

      await expect(
        expect(testFilePath).not.toBeTextFile(expectedText, {
          encoding
        })
      ).rejects.toThrow("Expected not to find the given text in path");
    }
  );

  it.each(scenarios)(
    "passes when comparing $encoding-encoded file with inexisting content",
    async ({ encoding }) => {
      const testFilePath = getEncodedTestFilePath(encoding);

      await expect(testFilePath).not.toBeTextFile("<<IMPOSSIBLE>>", {
        encoding
      });
    }
  );
});
