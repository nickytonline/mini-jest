const { prettyPrint } = require('./utilities');
const { expect: miniExpect } = require('./expect');

describe('expect', () => {
  beforeEach(() => {
    globalThis.console.log = jest.fn();
    globalThis.console.error = jest.fn();
  });

  it(`should coerce equality when using toBe`, () => {
    [
      { actual: '1', equalityValue: 1 },
      { actual: true, equalityValue: true },
      { actual: false, equalityValue: false },
    ].forEach(({ actual, equalityValue }) => {
      miniExpect(actual).toBe(equalityValue);
      expect(globalThis.console.log).toHaveBeenCalledTimes(1);
      expect(globalThis.console.log).toHaveBeenCalledWith('✅');
      expect(globalThis.console.error).not.toHaveBeenCalled();

      globalThis.console.log.mockClear();
      globalThis.console.error.mockClear();
    });
  });

  it(`should fail coercion equality when using toBe`, () => {
    [
      { actual: false, equalityValue: true },
      { actual: NaN, equalityValue: NaN },
    ].forEach(({ actual, equalityValue }) => {
      miniExpect(actual).toBe(equalityValue);
      expect(globalThis.console.error).toHaveBeenCalledTimes(1);
      expect(globalThis.console.error).toHaveBeenCalledWith(
        `❌ expected ${prettyPrint(actual)} to equal ${prettyPrint(
          equalityValue,
        )}`,
      );
      expect(globalThis.console.log).not.toHaveBeenCalled();

      globalThis.console.log.mockClear();
      globalThis.console.error.mockClear();
    });
  });

  it(`should have deeply equality when using toEqual`, () => {
    const testObject = { prop1: 'yolo', prop2: "'sup" };
    const newReferenceToTestObject = testObject;

    [
      { actual: testObject, equalityValue: newReferenceToTestObject },
      { actual: true, equalityValue: true },
      { actual: 12, equalityValue: 12 },
      { actual: !false, equalityValue: true },
      { actual: 'yolo', equalityValue: 'yolo' },
    ].forEach(({ actual, equalityValue }) => {
      miniExpect(actual).toEqual(equalityValue);
      expect(globalThis.console.log).toHaveBeenCalledTimes(1);
      expect(globalThis.console.log).toHaveBeenCalledWith('✅');
      expect(globalThis.console.error).not.toHaveBeenCalled();

      globalThis.console.log.mockClear();
      globalThis.console.error.mockClear();
    });
  });

  it(`should not have deeply equality when using toEqual`, () => {
    const testObject = { prop1: 'yolo', prop2: "'sup" };
    const newReferenceToTestObject = testObject;

    [
      { actual: testObject, equalityValue: { ...newReferenceToTestObject } },
      { actual: true, equalityValue: false },
      { actual: 12, equalityValue: 13 },
      { actual: 'yolo', equalityValue: 'yellow' },
    ].forEach(({ actual, equalityValue }) => {
      !miniExpect(actual).toEqual(equalityValue);
      expect(globalThis.console.log).not.toHaveBeenCalled();
      expect(globalThis.console.error).toHaveBeenCalledTimes(1);
      expect(globalThis.console.error).toHaveBeenCalledWith(
        `❌ expected ${prettyPrint(actual)} to equal ${prettyPrint(
          equalityValue,
        )}`,
      );

      globalThis.console.log.mockClear();
      globalThis.console.error.mockClear();
    });
  });
});
