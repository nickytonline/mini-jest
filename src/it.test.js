const { it: miniIt } = require("./it");

describe("it", () => {
  beforeEach(() => {
    globalThis.console.log = jest.fn();
  });
  it(`should run it's callback and log a description`, () => {
    const callback = jest.fn();
    const description = "Best test description ever";

    miniIt(description, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(globalThis.console.log).toHaveBeenCalledTimes(1);
    expect(globalThis.console.log).toHaveBeenCalledWith(description);
  });

  it(`should skip the it`, () => {
    const callback = jest.fn();
    const description = "Best test description ever";

    miniIt.skip(description, callback);

    expect(globalThis.console.log).toHaveBeenCalledTimes(1);
    expect(globalThis.console.log).toHaveBeenCalledWith(description);
    expect(callback).not.toHaveBeenCalled();
  });
});
