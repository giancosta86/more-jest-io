describe("Expecting stats from a file system object", () => {
  describe("expecting this test script", () => {
    describe("to be a file", () => {
      it("should pass", () =>
        expect(__filename).toHaveStats(stats => stats.isFile()));
    });

    describe("to be a directory", () => {
      it("should fail", () =>
        expect(
          expect(__filename).toHaveStats(stats => stats.isDirectory())
        ).rejects.toThrow("Failed stats predicate"));
    });
  });

  describe("expecting an inexisting file", () => {
    describe("to have any stats predicate", () => {
      it("should fail", () =>
        expect(expect("<INEXISTING>").toHaveStats(() => true)).rejects.toThrow(
          "does not exist in the file system"
        ));
    });
  });
});
