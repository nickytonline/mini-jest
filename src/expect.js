// expect(something).toBe(something2);

function expect(actualValue) {
  return {
    toBe(expectedValue) {
      if (expectedValue == actualValue) {
        console.log('✅')
      } else {
        console.error(`❌ expected ${actualValue} to equal ${expectedValue}`)
      }
    }
  }
}

module.exports = {
  expect
}