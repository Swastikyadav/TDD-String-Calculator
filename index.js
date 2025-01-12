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
  const delimiter = ",";

  const numbersArray = calculator.buildNumbersArray(
    str,
    baseDelimiter,
    delimiter
  );

  return numbersArray.reduce((acc, cv) => acc + cv, 0);
}

const calculator = {
  add,
  buildNumbersArray,
};

module.exports = calculator;
