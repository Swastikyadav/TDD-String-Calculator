const calculator = require("../index");
const { add, buildNumbersArray } = calculator;

describe("string calculator", () => {
  describe("two numbers separated by commas", () => {
    test("empty string should return 0", () => {
      expect(add("")).toEqual(0);
    });

    test("single number should return the number itself", () => {
      expect(add("1")).toEqual(1);
    });

    test("2 comma separated numbers should return their sum", () => {
      expect(add("1, 2")).toEqual(3);
    });
  });

  describe("allow unknown amount of numbers", () => {
    test("any amount of numbers should return their sum", () => {
      expect(add("1, 2, 3, 4")).toEqual(10);
    });
  });

  describe("handle new line", () => {
    test("new line should act as a delimiter", () => {
      const buildNumbersArraySpy = jest.spyOn(calculator, "buildNumbersArray");

      expect(add("1\n2,3")).toEqual(6);
      expect(buildNumbersArraySpy).toHaveBeenCalled();
    });
  });

  describe("buildNumbersArray", () => {
    test("should return an array of numbers from string separated by baseDelimiter and delimiter", () => {
      expect(buildNumbersArray("1\n2,3", "\n", ",")).toEqual([1, 2, 3]);
    });
  });
});
