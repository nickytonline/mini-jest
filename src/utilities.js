function prettyPrint(value) {
  return JSON.stringify(value, null, '\t');
}

module.exports = {
  prettyPrint,
};
