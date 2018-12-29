const run = require('./run');

test('TestCase 1', () => {
  const { found } = run([1, -1]);
  expect(found).toEqual(0);
});

test('TestCase 2', () => {
  const { found } = run([+3, +3, +4, -2, -4]);
  expect(found).toEqual(10);
});

test('TestCase 3', () => {
  const { found } = run([-6, +3, +8, +5, -6]);
  expect(found).toEqual(5);
});

test('TestCase 4', () => {
  const { found } = run([+7, +7, -2, -7, -4]);
  expect(found).toEqual(14);
});
