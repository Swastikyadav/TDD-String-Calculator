function buildNumbersArray(str, baseDelimiter, delimiter) {
  const [baseLeft, baseRight = ""] = str.split(baseDelimiter);

  let stringToEvaluate = `${baseLeft}${baseRight ? "," + baseRight : ""}`;
  let delimiterArray =
    delimiter.length > 1 ? delimiter.split(",") : [delimiter];

  delimiterArray.forEach((delim) => {
    stringToEvaluate = stringToEvaluate.replaceAll(delim, ",");
  });

  return stringToEvaluate.split(",").map((num) => Number(num));
}

function parseDelimiter(str, baseDelimiter, defaultDelimiter) {
  if (str.startsWith("//")) {
    const delimiter = str.split("\n")[0].slice(2).replace("][", ",");
    const evaluateStr = str.split(baseDelimiter)[1];

    if (delimiter.startsWith("[") && delimiter.endsWith("]")) {
      return {
        delimiter: delimiter.slice(1, -1),
        evaluateStr,
      };
    }

    return { delimiter, evaluateStr };
  }

  return { delimiter: defaultDelimiter, evaluateStr: str };
}

function add(str) {
  if (!str) return 0;

  const baseDelimiter = "\n";
  let { delimiter, evaluateStr } = calculator.parseDelimiter(
    str,
    baseDelimiter,
    ","
  );
  str = evaluateStr;

  const numbersArray = calculator.buildNumbersArray(
    str,
    baseDelimiter,
    delimiter
  );

  validateNumsArrayAndThrow(numbersArray);

  return numbersArray
    .filter((num) => num < 1000)
    .reduce((acc, cv) => acc + cv, 0);
}

const calculator = {
  add,
  buildNumbersArray,
  parseDelimiter,
};

module.exports = calculator;
function validateNumsArrayAndThrow(numbersArray) {
  const negativeNumbers = numbersArray.filter((num) => Math.sign(num) === -1);

  if (negativeNumbers.length) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(",")}`
    );
  }
}
