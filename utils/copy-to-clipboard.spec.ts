/**
 * @jest-environment jsdom
 */

import copyToClipboard from './copy-to-clipboard';
describe('Copying to clipboard', () => {
  test('works', () => {
    const spyFunc = jest.fn();
    Object.defineProperty(global.document, 'execCommand', { value: spyFunc });

    copyToClipboard('Some test phrase');

    expect(global.document.execCommand).toHaveBeenCalledWith('copy');
  });
});
