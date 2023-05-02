import { join } from "node:path";
import { writeFile } from "node:fs/promises";
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

        expect(tempFilePath).toExist();
      });

      it("...and should re-create the directory before the subsequent test", () =>
        expect(tempFilePath).not.toExist());
    });

    describe("when requesting a shared directory", () => {
      const tempDirectory = useVolatileTempDirectory({
        shared: true
      });
      const tempFilePath = join(tempDirectory, tempFileName);

      it("should enable file creation during a test...", async () => {
        await writeFile(tempFilePath, expectedTempFileContent);

        expect(tempFilePath).toExist();
      });

      it("...and should keep the files available for subsequent tests", () =>
        expect(tempFilePath).toBeTextFile(expectedTempFileContent));
    });
  });
});
