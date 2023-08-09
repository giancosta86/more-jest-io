import { join } from "node:path";

const sourceDirectoryName = "src";
const distDirectoryName = "dist";

const sourceDirectoryRegex = new RegExp(`^(.+?/${sourceDirectoryName})/`);
const distDirectoryRegex = new RegExp(`^(.+?/${distDirectoryName})/`);

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

export function getSourceDirectory(runningScriptPath?: string): string {
  const actualRunningScriptPath =
    runningScriptPath ?? expect.getState().testPath;

  if (!actualRunningScriptPath) {
    throw new Error("Cannot detect the path of the running script!");
  }

  const detectedSourceDirectory =
    getSourceDirectoryFromPotentialSource(actualRunningScriptPath) ??
    getSourceDirectoryFromPotentialCompiled(actualRunningScriptPath);

  if (!detectedSourceDirectory) {
    throw new Error(
      `Cannot detect the source directory for the given running script!`
    );
  }

  return detectedSourceDirectory;
}
