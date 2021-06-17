function describe(description, callback) {
  console.log(description);
  callback();
}

describe.skip = function(description, callback) {
  console.log(description);

  return;
}

// TODO: Implement describe.only possibly via parsing test file AST?

module.exports = { describe }