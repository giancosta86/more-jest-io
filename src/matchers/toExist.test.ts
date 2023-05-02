describe("Expecting existence", () => {
  describe("for this test script", () => {
    it("should pass", () => expect(__filename).toExist());

    describe("upon negation", () => {
      it("should fail", () =>
        expect(expect(__filename).not.toExist()).rejects.toThrow());
    });
  });

  describe("for inexisting file", () => {
    it("should fail", () =>
      expect(expect("<INEXISTING>").toExist()).rejects.toThrow(
        "does not exist in the file system"
      ));

    describe("upon negation", () => {
      it("should pass", () => expect("<INEXISTING>").not.toExist());
    });
  });
});
