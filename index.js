function add(str) {
  if (!str) return 0;

  return str.split(",").reduce((acc, cv) => acc + Number(cv), 0);
}

module.exports = {
  add,
};
