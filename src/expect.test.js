const { expect: miniExpect } = require('./expect')
describe('expect', () => {
  beforeEach(() => {
    globalThis.console.log = jest.fn();
    globalThis.console.error = jest.fn();
  })

  it(`should coerce equality when using toBe`, () => {
    [
      { actual: "1", equalityValue: 1 },
      { actual: true, equalityValue: true },
      { actual: false, equalityValue: false }
    ].forEach(({actual, equalityValue}) => {
      miniExpect(actual).toBe(equalityValue);
      expect(globalThis.console.log).toHaveBeenCalledTimes(1)
      expect(globalThis.console.log).toHaveBeenCalledWith('✅')
      expect(globalThis.console.error).not.toHaveBeenCalled()

      globalThis.console.log.mockClear();
      globalThis.console.error.mockClear();
    })
  })

  it(`should fail coercion equality when using toBe`, () => {
    [
      { actual: false, equalityValue: true },
      { actual: NaN, equalityValue: NaN }
    ].forEach(({actual, equalityValue}) => {
      miniExpect(actual).toBe(equalityValue);
      expect(globalThis.console.error).toHaveBeenCalledTimes(1)
      expect(globalThis.console.error).toHaveBeenCalledWith(`❌ expected ${actual} to equal ${equalityValue}`)
      expect(globalThis.console.log).not.toHaveBeenCalled()

      globalThis.console.log.mockClear();
      globalThis.console.error.mockClear();
    })
  })
})