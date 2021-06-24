const { prettyPrint, areSameObjectProperties } = require('./utilities');

// expect(something).toBe(something2);

function expect(actualValue) {
  return {
    not: {
      toBe(expectedValue) {
        if (!Object.is(expectedValue, actualValue)) {
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
        if (typeof expectedValue === 'object') {
          if (!areSameObjectProperties(expectedValue, actualValue)) {
            console.log('✅');
          } else {
            console.error(
              `❌ expected ${prettyPrint(actualValue)} to equal ${prettyPrint(
                expectedValue,
              )}`,
            );
          }
        } else {
          if (expectedValue != actualValue) {
            console.log('✅');
          } else {
            console.error(
              `❌ expected ${prettyPrint(actualValue)} to equal ${prettyPrint(
                expectedValue,
              )}`,
            );
          }
        }
      },
    },
    toBe(expectedValue) {
      if (Object.is(expectedValue, actualValue)) {
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
      if (typeof expectedValue === 'object') {
        if (areSameObjectProperties(expectedValue, actualValue)) {
          console.log('✅');
        } else {
          console.error(
            `❌ expected ${prettyPrint(actualValue)} to equal ${prettyPrint(
              expectedValue,
            )}`,
          );
        }
      } else {
        if (expectedValue == actualValue) {
          console.log('✅');
        } else {
          console.error(
            `❌ expected ${prettyPrint(actualValue)} to equal ${prettyPrint(
              expectedValue,
            )}`,
          );
        }
      }
    },
  };
}

module.exports = {
  expect,
};
