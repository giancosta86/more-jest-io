import { join } from "node:path";

const sourceDirectoryName = "src";
const distDirectoryName = "dist";

const sourceDirectoryRegex = new RegExp(`^(.+?/${sourceDirectoryName})/`);
const distDirectoryRegex = new RegExp(`^(.+?/${distDirectoryName})/`);

export function getSourceDirectory(callingScriptPath?: string): string {
  const actualCallingScriptPath =
    callingScriptPath ?? expect.getState().testPath;

  if (!actualCallingScriptPath) {
    throw new Error("Cannot detect the path of the running script!");
  }

  const detectedSourceDirectory =
    getSourceDirectoryFromPotentialSource(actualCallingScriptPath) ??
    getSourceDirectoryFromPotentialCompiled(actualCallingScriptPath);

  if (!detectedSourceDirectory) {
    throw new Error(`Cannot detect the source directory for the given script!`);
  }

  return detectedSourceDirectory;
}

function getSourceDirectoryFromPotentialSource(
  scriptPath: string
): string | null {
  return getDirectoryFromRegexAndPath(sourceDirectoryRegex, scriptPath);
}

function getSourceDirectoryFromPotentialCompiled(
  scriptPath: string
): string | null {
  const detectedDistDirectory = getDirectoryFromRegexAndPath(
    distDirectoryRegex,
    scriptPath
  );

  return detectedDistDirectory
    ? join(detectedDistDirectory, "..", sourceDirectoryName)
    : null;
}

function getDirectoryFromRegexAndPath(
  directoryRegex: RegExp,
  path: string
): string | null {
  const directoryMatch = directoryRegex.exec(path);

  if (!directoryMatch || !directoryMatch[1]) {
    return null;
  }

  return directoryMatch[1];
}
