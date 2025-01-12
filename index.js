function buildNumbersArray(str, baseDelimiter, delimiter) {
  const baseSplit = str.split(baseDelimiter);
  const baseLeft = baseSplit[0] || "";
  const baseRight = baseSplit[1] || "";

  let stringToEvaluate = baseLeft + (baseRight ? "," : "") + baseRight;
  let delimiterArray = [];

  if (delimiter.length === 1) {
    delimiterArray = [delimiter];
  } else if (delimiter.length > 1) {
    delimiterArray = delimiter.split(",");
  }

  delimiterArray.forEach((delim) => {
    stringToEvaluate = stringToEvaluate.replaceAll(delim, ",");
  });

  const numbersArray = [...stringToEvaluate.split(",")];

  return numbersArray.map((num) => Number(num));
}

function parseDelimiter(str, baseDelimiter, defaultDelimiter) {}

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

  const negativeNumbers = numbersArray.filter((num) => Math.sign(num) === -1);

  if (negativeNumbers.length) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(",")}`
    );
  }

  return numbersArray.reduce((acc, cv) => (cv > 1000 ? acc : acc + cv), 0);
}

const calculator = {
  add,
  buildNumbersArray,
  parseDelimiter,
};

module.exports = calculator;
