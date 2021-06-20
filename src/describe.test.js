const { describe: miniDescribe } = require('./describe');

describe('describe', () => {
  beforeEach(() => {
    globalThis.console.log = jest.fn();
  });
  it(`should run describe's callback and log a description`, () => {
    const callback = jest.fn();
    const description = 'Best test description ever';

    miniDescribe(description, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(globalThis.console.log).toHaveBeenCalledTimes(1);
    expect(globalThis.console.log).toHaveBeenCalledWith(description);
  });

  it(`should skip the describe`, () => {
    const callback = jest.fn();
    const description = 'Best test description ever';

    miniDescribe.skip(description, callback);

    expect(globalThis.console.log).toHaveBeenCalledTimes(1);
    expect(globalThis.console.log).toHaveBeenCalledWith(description);
    expect(callback).not.toHaveBeenCalled();
  });
});
