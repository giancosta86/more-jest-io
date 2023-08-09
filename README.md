# more-jest-io

_TypeScript I/O matchers and utilities for Jest_

![GitHub CI](https://github.com/giancosta86/more-jest-io/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fmore-jest-io.svg)](https://badge.fury.io/js/@giancosta86%2Fmore-jest-io)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

**more-jest-io** is a TypeScript library providing I/O-related matchers and utilities for Jest.

## Installation

The NPM package is:

> @giancosta86/more-jest-io

The public API entirely resides in the root package index, so one shouldn't reference specific modules from TypeScript code.

### Global matchers

In order to be able to access the custom matchers provided by this library within any test file in your project, please follow these steps:

1. Create a declaration file (for example, `global.d.ts`) in the root directory of your project, containing the following line:

   ```typescript
   import "@giancosta86/more-jest-io";
   ```

1. In the `jest.config.js` configuration file, add an entry to the `setupFilesAfterEnv` array field:

   ```typescript
   module.exports = {
     setupFilesAfterEnv: ["@giancosta86/more-jest-io/dist/all"]
   };
   ```

## Matchers

- `toBeTextFile(expectedTextContent[,{encoding: "utf-8"}])`: an **asynchronous** matcher ensuring that the received file path is a text file with the expected text:

  ```typescript
  //Reading with utf-8 encoding
  await expect(myTempFilePath).toBeTextFile("Alpha\nBeta\nGamma");

  //Reading with latin1 encoding
  await expect(myFrenchFilePath).toBeTextFile("Je préférérais une œvre d'art", {
    encoding: "latin1"
  });
  ```

- `toExist()`: **asynchronous** matcher ensuring that a file system path exists. For example:

  ```typescript
  await expect(myPath).toExist();

  await expect(inexistingPath).not.toExist();
  ```

- `toHaveStats(<predicate on Stats object>)`: **asynchronous** matcher ensuring that a file system path exists _and_ satisfies the given predicate about its `Stats`.

  For example:

  ```typescript
  await expect(myPath).toHaveStats(stats => stats);
  ```

## Utilities

- `getSourceDirectory([callingScriptPath])`: given a script path - which may reside at any level under the `src` or the `dist` directory of a project - returns the path of its `src` directory.

  It is especially useful in tests, to retrieve external files (such as test databases, test binary files, ...) that must be accessible while running tests from both TypeScript sources and compiled JS scripts - without copying files.

  If `callingScriptPath` is omitted, the path of the current script executed by Jest will be passed.

  If the source directory cannot be detected for a variety of reasons, the function throws a descriptive error.

  Example usage:

  ```typescript
  describe("something", () => {
    it("should...", () => {
      const anyFile = join(getSourceDirectory(), "testData", "alpha.bin");

      //Access the file no matter where your test resides
    });
  });
  ```

- `useVolatileTempDirectory([options])`: returns a **temporary directory** that:

  - is **unique** - as its name is based on a `UUID`

  - is managed by the test infrastructure - automatically deleted at the end of each test (the default) or at the end of the enclosing `describe` block.

  Consequently, it should be called just once - in a `describe` body - assigning its value to a constant that can be safely used within sub-block, especially test cases:

  ```typescript
  describe("something", () => {
    const myTempDirectoryPath = useVolatileTempDirectory();

    it("should...", () => {
      //Here, myTempDirectoryPath is ready and empty
    });

    it("should...", () => {
      //Here, too, myTempDirectoryPath is ready and empty,
      //unless you pass {shared: true}
    });
  });
  ```

  If you pass `{shared: true}`, the temporary directory will have the same lifecycle as its enclosing `describe` block, thus enabling file sharing between tests and sub-blocks in general.
