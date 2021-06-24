const { prettyPrint } = require('./utilities');

// expect(something).toBe(something2);

function expect(actualValue) {
  return {
    toBe(expectedValue) {
      if (expectedValue == actualValue) {
        console.log('✅');
      } else {
        console.error(
          `❌ expected ${prettyPrint(actualValue)} to equal ${prettyPrint(
            expectedValue,
          )}`,
        );
      }
    },
    toEqual(expectedValue) {
      if (expectedValue === actualValue) {
        console.log('✅');
      } else {
        console.error(
          `❌ expected ${prettyPrint(actualValue)} to equal ${prettyPrint(
            expectedValue,
          )}`,
        );
      }
    },
  };
}

module.exports = {
  expect,
};
