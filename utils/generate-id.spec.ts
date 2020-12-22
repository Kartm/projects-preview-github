import generateId from './generate-id';

describe('Generating random ids', () => {
  test('works', () => {
    const id = generateId();
    expect(id.length >= 9).toBeTruthy();
  });

  test('doesnt cause frequent collisions', () => {
    const ids: string[] = [];

    for (let i = 0; i < 10000; i++) {
      const newId = generateId();
      expect(ids.includes(newId)).toBeFalsy();
      ids.push(newId);
    }
  });
});
