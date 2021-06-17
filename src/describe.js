function describe(description, callback) {
  console.log(description);
  callback();
}

describe.skip = function(description, callback) {
  console.log(description);

  return;
}

module.exports = { describe }