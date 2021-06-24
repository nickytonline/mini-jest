const { prettyPrint, areSameObjectProperties } = require("./utilities");

// expect(something).toBe(something2);

function expect(actualValue) {
  const functions = (invert) => {
    return {
      toBe(expectedValue) {
        let test = Object.is(expectedValue, actualValue);
        if (invert) test = !test;

        if (test) {
          console.log("✅");
        } else {
          console.error(
            `❌ expected ${prettyPrint(actualValue)} to equal ${prettyPrint(
              expectedValue
            )}`
          );
        }
      },
      toEqual(expectedValue) {
        let test;
        if (typeof expectedValue === "object") {
          test = areSameObjectProperties(expectedValue, actualValue);
          if (invert) test = !test;

          if (test) {
            console.log("✅");
          } else {
            console.error(
              `❌ expected ${prettyPrint(actualValue)} to equal ${prettyPrint(
                expectedValue
              )}`
            );
          }
        } else {
          test = expectedValue == actualValue;
          if (invert) test = !test;

          if (test) {
            console.log("✅");
          } else {
            console.error(
              `❌ expected ${prettyPrint(actualValue)} to equal ${prettyPrint(
                expectedValue
              )}`
            );
          }
        }
      },
    };
  };

  const object = functions(false)
  object.not = functions(true);

  return object;
}

module.exports = {
  expect,
};
