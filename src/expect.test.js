const { prettyPrint } = require('./utilities');
const { expect: miniExpect } = require('./expect');

describe('expect', () => {
  beforeEach(() => {
    globalThis.console.log = jest.fn();
    globalThis.console.error = jest.fn();
  });

  describe('not', () => {
    it(`should not have deep equality when using .not.toBe`, () => {
      const testObject = { prop1: 'yolo', prop2: "'sup" };
      const newReferenceToTestObject = { prop1: 'yolo' };

      [
        { actual: testObject, equalityValue: newReferenceToTestObject },
        { actual: 1, equalityValue: 12 },
        { actual: true, equalityValue: false },
        { actual: 'hi', equalityValue: 'yo' },
      ].forEach(({ actual, equalityValue }) => {
        miniExpect(actual).not.toBe(equalityValue);
        expect(globalThis.console.log).toHaveBeenCalledTimes(1);
        expect(globalThis.console.log).toHaveBeenCalledWith('✅');
        expect(globalThis.console.error).not.toHaveBeenCalled();

        globalThis.console.log.mockClear();
        globalThis.console.error.mockClear();
      });
    });

    it(`should not have equality (not deep) when using .not.toEqual`, () => {
      const testObject = { prop1: 'yolo', prop2: "'sup" };
      const testObject2 = { prop2: "'sup" };

      [
        { actual: testObject, equalityValue: testObject2 },
        { actual: true, equalityValue: false },
        { actual: 12, equalityValue: 11 },
        { actual: false, equalityValue: true },
        { actual: 'yolo', equalityValue: 'yo' },
      ].forEach(({ actual, equalityValue }) => {
        miniExpect(actual).not.toEqual(equalityValue);
        expect(globalThis.console.log).toHaveBeenCalledTimes(1);
        expect(globalThis.console.log).toHaveBeenCalledWith('✅');
        expect(globalThis.console.error).not.toHaveBeenCalled();

        globalThis.console.log.mockClear();
        globalThis.console.error.mockClear();
      });
    });
  });

  it(`should have deep equality when using toBe`, () => {
    const testObject = { prop1: 'yolo', prop2: "'sup" };
    const newReferenceToTestObject = testObject;

    [
      { actual: testObject, equalityValue: newReferenceToTestObject },
      { actual: 1, equalityValue: 1 },
      { actual: true, equalityValue: !!true },
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

  it(`should fail if not deep equality when using toBe`, () => {
    [
      { actual: false, equalityValue: true },
      { actual: 'yolo', equalityValue: 'yellow' },
      { actual: 12, equalityValue: 1 },
      { actual: 0, equalityValue: -0 },
      { actual: +0, equalityValue: -0 },
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

  it(`should have equality (not deep) when using toEqual`, () => {
    const testObject = { prop1: 'yolo', prop2: "'sup" };
    const newReferenceToTestObject = testObject;

    [
      { actual: testObject, equalityValue: { ...newReferenceToTestObject } },
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

  it(`should not have equality (not deep) when using toEqual`, () => {
    const testObject = { prop1: 'yolo', prop2: "'sup" };
    const newReferenceToTestObject = testObject;

    [
      { actual: testObject, equalityValue: { prop3: 'hello' } },
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
