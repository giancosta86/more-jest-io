import { getSourceDirectory } from "./getSourceDirectory";

describe("Requesting the source directory", () => {
  describe("from a source script", () => {
    describe("right in the source directory", () => {
      it("should extract the source directory", () =>
        expect(getSourceDirectory("/a/b/c/src/ciop.ts")).toBe("/a/b/c/src"));
    });

    describe("in a nested directory", () => {
      it("should extract the source directory", () =>
        expect(getSourceDirectory("/a/b/c/src/x/y/yogi.ts")).toBe(
          "/a/b/c/src"
        ));
    });

    describe("having .js extension", () => {
      it("should extract the source directory", () =>
        expect(getSourceDirectory("/a/b/c/src/x/y/bubu.js")).toBe(
          "/a/b/c/src"
        ));
    });

    describe("having multiple 'src' path components", () => {
      it("should stop at the first src component", () => {
        expect(getSourceDirectory("/a/b/src/c/src/dodo.ts")).toBe("/a/b/src");

        expect(getSourceDirectory("/a/b/src/c/src/x/src/y/dodo.ts")).toBe(
          "/a/b/src"
        );
      });
    });

    describe("having 'src'-like path components", () => {
      it("should extract the actual source directory", () => {
        expect(getSourceDirectory("/a/b/src-example/c/src/dodo.ts")).toBe(
          "/a/b/src-example/c/src"
        );

        expect(getSourceDirectory("/a/b/example-src/c/src/dodo.ts")).toBe(
          "/a/b/example-src/c/src"
        );
      });
    });

    describe("in a non-meaningful 'dist' subdirectory", () => {
      it("should extract the actual source directory", () =>
        expect(getSourceDirectory("/a/b/src/c/dist/dodo.ts")).toBe("/a/b/src"));
    });
  });

  describe("from a compiled script", () => {
    describe("right in the dist directory", () => {
      it("should infer the source directory", () =>
        expect(getSourceDirectory("/a/b/c/dist/ciop.ts")).toBe("/a/b/c/src"));
    });

    describe("in a nested directory", () => {
      it("should infer the source directory", () =>
        expect(getSourceDirectory("/a/b/c/dist/x/y/yogi.ts")).toBe(
          "/a/b/c/src"
        ));
    });

    describe("having .js extension", () => {
      it("should infer the source directory", () =>
        expect(getSourceDirectory("/a/b/c/dist/x/y/bubu.js")).toBe(
          "/a/b/c/src"
        ));
    });
  });

  describe("from a script neither in the source nor in the dist directory", () => {
    it("should throw", () =>
      expect(() => getSourceDirectory("/a/b/c/ciop.ts")).toThrow(
        "Cannot detect the source directory for the given script!"
      ));
  });

  describe("when passing no argument", () => {
    it("should return the source directory of the current project", () => {
      expect(getSourceDirectory()).toEndWith("/src");
    });
  });

  describe("when the calling script cannot be detected", () => {
    it("should throw", () => {
      const originalTestPath = expect.getState().testPath;

      try {
        expect.getState().testPath = undefined;

        expect(() => getSourceDirectory()).toThrow(
          "Cannot detect the path of the running script!"
        );
      } finally {
        expect.getState().testPath = originalTestPath;
      }
    });
  });
});
