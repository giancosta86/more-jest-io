import { join } from "node:path";
import { writeFile, stat } from "node:fs/promises";
import { useVolatileTempDirectory } from "./useVolatileTempDirectory";

describe("Volatile temporary directory", () => {
  describe("persistence", () => {
    const tempFileName = "yogi";
    const expectedTempFileContent = "This is Yellowstone Park!";

    describe("by default", () => {
      const tempDirectory = useVolatileTempDirectory();
      const tempFilePath = join(tempDirectory, tempFileName);

      it("should enable file creation during a test...", async () => {
        await writeFile(tempFilePath, expectedTempFileContent);
        const tempFileStats = await stat(tempFilePath);

        expect(tempFileStats.isFile()).toBeTrue();
      });

      it("...and should re-create the directory before the subsequent test", () =>
        expect(() => stat(tempFilePath)).rejects.toThrow());
    });

    describe("when requesting a shared directory", () => {
      const tempDirectory = useVolatileTempDirectory({
        shared: true
      });
      const tempFilePath = join(tempDirectory, tempFileName);

      it("should enable file creation during a test...", async () => {
        await writeFile(tempFilePath, expectedTempFileContent);
        const tempFileStats = await stat(tempFilePath);

        expect(tempFileStats.isFile()).toBeTrue();
      });

      it("...and should keep the files available for subsequent tests", () =>
        expect(tempFilePath).toBeTextFile(expectedTempFileContent));
    });
  });
});
