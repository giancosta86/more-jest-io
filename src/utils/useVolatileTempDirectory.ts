import { join } from "node:path";
import { mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { v4 as uuid4 } from "uuid";

export type UseVolatileTempDirectoryOptions = Readonly<{
  shared?: boolean;
}>;

export function useVolatileTempDirectory(
  options?: UseVolatileTempDirectoryOptions
): string {
  const shared = options?.shared ?? false;

  const uniqueTempPath = join(tmpdir(), uuid4());

  const createTempDirectory = () => mkdir(uniqueTempPath, { recursive: true });
  const deltreeTempDirectory = () => rm(uniqueTempPath, { recursive: true });

  if (shared) {
    beforeAll(createTempDirectory);
    afterAll(deltreeTempDirectory);
  } else {
    beforeEach(createTempDirectory);
    afterEach(deltreeTempDirectory);
  }

  return uniqueTempPath;
}
