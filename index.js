function buildNumbersArray(str, delimiter) {
  const [baseLeft, baseRight = ""] = str.split("\n");
  let stringToEvaluate = `${baseLeft}${baseRight ? "," + baseRight : ""}`;

  delimiter.forEach((delim) => {
    stringToEvaluate = stringToEvaluate.replaceAll(delim, ",");
  });

  return stringToEvaluate.split(",").map((num) => Number(num));
}

function parseDelimiter(str, baseDelimiter = "\n", defaultDelimiter = ",") {
  if (str.startsWith("//")) {
    const [delimiterDefinition, ...numbersStringPart] =
      str.split(baseDelimiter);
    const delimiter = delimiterDefinition.slice(2).replace("][", ",");
    const evaluateStr = numbersStringPart.join(",");

    if (delimiter.startsWith("[") && delimiter.endsWith("]")) {
      return {
        delimiter: delimiter.slice(1, -1).split(","),
        evaluateStr,
      };
    }

    return { delimiter: [delimiter], evaluateStr };
  }

  return { delimiter: [defaultDelimiter], evaluateStr: str };
}

function validateNumsArrayAndThrow(numbersArray) {
  const negativeNumbers = numbersArray.filter((num) => Math.sign(num) === -1);

  if (negativeNumbers.length) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(",")}`
    );
  }
}

function calculate(numbersArray) {
  return numbersArray
    .filter((num) => num < 1000)
    .reduce((acc, cv) => acc + cv, 0);
}

function oddEvenParser(numbersArray, type) {
  if (type) {
    if (type === "odd") {
      return numbersArray.filter((_, idx) => idx % 2 !== 0);
    } else if (type === "even") {
      return numbersArray.filter((_, idx) => idx % 2 === 0);
    }
  }

  return numbersArray;
}

function add(str, type) {
  if (!str) return 0;

  const { delimiter, evaluateStr } = calculator.parseDelimiter(str);
  let numbersArray = calculator.buildNumbersArray(evaluateStr, delimiter);
  validateNumsArrayAndThrow(numbersArray);
  numbersArray = oddEvenParser(numbersArray, type);

  return calculate(numbersArray);
}

const calculator = {
  add,
  buildNumbersArray,
  parseDelimiter,
};

module.exports = calculator;

// Single Responsibility Principle: Each function handles only one task.
// Open/Closed Principle: Adding new delimiter formats or validation rules is easy without modifying existing code.
// Liskov Substitution Principle: Each class can be replaced or extended without breaking functionality.
// Interface Segregation Principle: Each class has a clear, focused interface.
// Dependency Inversion Principle: The add function depends on abstractions (other funcs), not implementaion details.
