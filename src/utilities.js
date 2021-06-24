function prettyPrint(value) {
  return JSON.stringify(value, null, '\t');
}

function areSameObjectProperties(expectedValue, actualValue) {
  if (typeof expectedValue !== 'object' || typeof actualValue !== 'object') {
    return false;
  }

  const actualEntries = Object.entries(actualValue);
  const expectedEntries = Object.entries(expectedValue);

  if (actualEntries.length !== expectedEntries.length) {
    return false;
  }

  for (let i = 0; actualEntries.length < i; i++) {
    const [actualName, actualValue] = actualEntries[i];
    const [expectedName, expectedValue] = expectedEntries[i];

    if (expectedName !== actualName && expectedValue !== actualValue) {
      return false;
    }
  }

  return true;
}

module.exports = {
  prettyPrint,
  areSameObjectProperties,
};
