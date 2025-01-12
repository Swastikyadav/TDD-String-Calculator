const { add } = require("../index");

describe("string calculator", () => {
  describe("add two numbers separated by commas and return their sum", () => {
    test("empty string should return 0", () => {
      expect(add("")).toEqual(0);
    });
  });
});
