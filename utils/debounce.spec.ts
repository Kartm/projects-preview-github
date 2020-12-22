import debounce from './debounce';

describe('Debouncing', () => {
  test('limits function calls', async () => {
    const mockFunction = jest.fn();
    const debouncedMockFunction = debounce(mockFunction, 1500);

    // mockFunction should not be called, but rather wait 1500 ms
    debouncedMockFunction();
    expect(mockFunction).toHaveBeenCalledTimes(0);

    // try some more calls within a second, should still wait
    for (let i = 0; i < 10; i++) {
      await new Promise(res => setTimeout(res, 100));
      debouncedMockFunction();
    }
    expect(mockFunction).toHaveBeenCalledTimes(0);

    await new Promise(res => setTimeout(res, 2000));
    expect(mockFunction).toHaveBeenCalledTimes(1); // finally called after the timeout
  });
});
