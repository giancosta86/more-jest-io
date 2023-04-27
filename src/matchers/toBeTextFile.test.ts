import { join } from "node:path";
import { getSourceDirectory } from "../utils";

describe("Expecting text file content", () => {
  const testDirectory = join(getSourceDirectory(), "test");

  describe("in UTF-8 encoding", () => {
    const testFilePath = join(testDirectory, "utf8.txt");
    const expectedContent = "Alpha\nBeta";

    describe("when expecting the real content", () => {
      it("should pass", () =>
        expect(testFilePath).toBeTextFile(expectedContent));
    });

    describe("when expecting some different content", () => {
      it("should fail", () =>
        expect(
          expect(testFilePath).toBeTextFile("<SOMETHING ELSE>")
        ).rejects.toThrow("Expected text content for file"));
    });
  });

  describe("in Latin-1 encoding", () => {
    const testFilePath = join(testDirectory, "latin1.txt");
    const expectedContent = "Je préférérais une fenêtre.";

    describe("when expecting the real content", () => {
      it("should pass", () =>
        expect(testFilePath).toBeTextFile(expectedContent, {
          encoding: "latin1"
        }));
    });
  });
});
