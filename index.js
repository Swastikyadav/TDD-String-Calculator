function add(str) {
  if (!str) return 0;

  return str.split(",").reduce((acc, cv) => acc + +cv, 0);
}

module.exports = {
  add,
};
