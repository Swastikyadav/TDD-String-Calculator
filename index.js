function buildNumbersArray(str, baseDelimiter, delimiter) {
  const baseSplit = str.split(baseDelimiter);
  const baseLeft = baseSplit[0] || "";
  const baseRight = baseSplit[1] || "";

  const numbersArray = [
    ...(baseLeft ? baseLeft.split(delimiter) : []),
    ...(baseRight ? baseRight.split(delimiter) : []),
  ];

  return numbersArray.map((num) => Number(num));
}

function add(str) {
  if (!str) return 0;

  const baseDelimiter = "\n";
  let delimiter = ",";

  if (str.startsWith("//")) {
    delimiter = str.split("\n")[0].slice(2).replace("][", ",");
    if (delimiter.startsWith("[") && delimiter.endsWith("]")) {
      delimiter = delimiter.slice(1, -1);
    }
    str = str.split(baseDelimiter)[1];
  }

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
};

module.exports = calculator;
