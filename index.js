function add(str) {
  if (!str) return 0;
  if (str.length === 1) return +str;

  const newLineSplit = str.split("\n");
  const newLineLeft = newLineSplit[0] || "";
  const newLineRight = newLineSplit[1] || "";

  return [...newLineLeft.split(","), ...newLineRight.split(",")].reduce(
    (acc, cv) => acc + Number(cv),
    0
  );
}

module.exports = {
  add,
};
