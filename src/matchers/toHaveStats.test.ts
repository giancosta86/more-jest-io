import { Stats } from "node:fs";

const matchingScenarios = [
  {
    description: "this test script tested as a file",
    path: __filename,
    predicate: (stats: Stats) => stats.isFile()
  },

  {
    description: "this test script directory tested as a directory",
    path: __dirname,
    predicate: (stats: Stats) => stats.isDirectory()
  }
];

const nonMatchingScenarios = [
  {
    description: "this test script tested as a directory",
    path: __filename,
    predicate: (stats: Stats) => stats.isDirectory()
  },

  {
    description: "this test script directory tested as a file",
    path: __dirname,
    predicate: (stats: Stats) => stats.isFile()
  },

  {
    description: "inexisting file, no matter the predicate",
    path: "<INEXISTING>",
    predicate: () => true
  }
];

describe(".toHaveStats", () => {
  it.each(matchingScenarios)(
    "passes when given $description",
    async ({ path, predicate }) => {
      await expect(path).toHaveStats(predicate);
    }
  );

  it.each(nonMatchingScenarios)(
    "fails when given $description",
    async ({ path, predicate }) => {
      await expect(expect(path).toHaveStats(predicate)).rejects.toThrow(
        "Expected path to satisfy the given predicate"
      );
    }
  );
});

describe(".not.toHaveStats", () => {
  it.each(matchingScenarios)(
    "fails when given $description",
    async ({ path, predicate }) => {
      await expect(expect(path).not.toHaveStats(predicate)).rejects.toThrow(
        "Expected path not to satisfy the given predicate"
      );
    }
  );

  it.each(nonMatchingScenarios)(
    "passes when given $description",
    async ({ path, predicate }) => {
      await expect(path).not.toHaveStats(predicate);
    }
  );
});
