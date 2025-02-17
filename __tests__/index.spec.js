const calculator = require("../index");
const { add, buildNumbersArray, parseDelimiter, calculate } = calculator;

const buildNumbersArraySpy = jest.spyOn(calculator, "buildNumbersArray");
const parseDelimiterSpy = jest.spyOn(calculator, "parseDelimiter");
const calculateSpy = jest.spyOn(calculator, "calculate");

describe("string calculator", () => {
  afterEach(() => {
    if (
      expect.getState().currentTestName ===
      "string calculator two numbers separated by commas empty string should return 0"
    ) {
      return;
    }

    expect(buildNumbersArraySpy).toHaveBeenCalled();
    expect(parseDelimiterSpy).toHaveBeenCalled();
    expect(calculateSpy).toHaveBeenCalled();
  });

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
      expect(add("1\n2,3")).toEqual(6);
    });
  });

  describe("buildNumbersArray", () => {
    test("should return an array of numbers from string separated by baseDelimiter and delimiter", () => {
      expect(buildNumbersArray("1\n2,3", [","])).toEqual([1, 2, 3]);
      expect(buildNumbersArray("1,2,3", [","])).toEqual([1, 2, 3]);
    });
  });

  describe("delimiter change", () => {
    test("should change delimiter from comma to char followed after //", () => {
      expect(add("//;\n1;2")).toEqual(3);
    });
  });

  describe("throw exception", () => {
    test("should throw exception for negative numbers", () => {
      expect(() => add("//;\n-1;2;-3")).toThrow(
        Error("negative numbers not allowed -1,-3")
      );
    });
  });

  describe("> 1000", () => {
    test("ignore numbers bigger than 1000", () => {
      expect(add("//;\n1;2;1002;3")).toEqual(6);
    });
  });

  describe("lengthy delimiter", () => {
    test("delimiter of any length should work", () => {
      expect(add("//[***]\n1***2***3")).toEqual(6);
    });
  });

  describe("multiple delimiters", () => {
    test("should work with multiple delimiters", () => {
      expect(add("//[*][%]\n1*2%3")).toEqual(6);
    });
  });

  describe("lengthy multiple delimiters", () => {
    test("should handle multiple delimiters with length > 1", () => {
      expect(add("//[***][%%]\n1***2%%3")).toEqual(6);
    });
  });

  describe("parseDelimiter", () => {
    test("should return parsed delimiter and string to evaluate", () => {
      expect(parseDelimiter("1,2,3")).toEqual({
        delimiter: [","],
        evaluateStr: "1,2,3",
      });
      expect(parseDelimiter("//[***][%%]\n1***2%%3")).toEqual({
        delimiter: ["***", "%%"],
        evaluateStr: "1***2%%3",
      });
    });
  });

  describe("combine custom and default delimiter", () => {
    test("delimiter combination should return sum of numbers", () => {
      expect(add("//;\n1;2,3")).toEqual(6);
      expect(add("//;\n1;2\n3")).toEqual(6);
    });
  });

  describe("odd or even parameter", () => {
    test("should handle odd or even index value addition", () => {
      expect(add("//;\n1;2,3", "odd")).toEqual(2);
      expect(add("//;\n1;2,3", "even")).toEqual(4);
    });
  });
});
