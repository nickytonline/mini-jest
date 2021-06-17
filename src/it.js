function it(description, callback) {
  console.log(description);

  callback();
}

it.skip = function(description, callback) {
  console.log(description);

  return;
}

module.exports = {
  it
}