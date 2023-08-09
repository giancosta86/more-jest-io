const matchingScenarios = [
  {
    description: "this test script",
    path: __filename
  }
];

const nonMatchingScenarios = [
  {
    description: "inexisting file",
    path: "<INEXISTING>"
  }
];

describe(".toExist", () => {
  it.each(matchingScenarios)(
    "passes when given $description",
    async ({ path }) => {
      await expect(path).toExist();
    }
  );

  it.each(nonMatchingScenarios)(
    "fails when given $description",
    async ({ path }) => {
      await expect(expect(path).toExist()).rejects.toThrow(
        "Expected path to exist"
      );
    }
  );
});

describe(".not.toExist", () => {
  it.each(matchingScenarios)(
    "fails when given $description",
    async ({ path }) => {
      await expect(expect(path).not.toExist()).rejects.toThrow(
        "Expected path not to exist"
      );
    }
  );

  it.each(nonMatchingScenarios)(
    "passes when given $description",
    async ({ path }) => {
      await expect(path).not.toExist();
    }
  );
});
