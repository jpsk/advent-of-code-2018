const run = require('./run');
test('Part1 Test1', () => {
  expect(run.part1('dabAcCaCBAcCcaDA')).toEqual(10);
})

test('Part2, Test1', () => {
  expect(run.part2('dabAcCaCBAcCcaDA')).toEqual(4);
})

test('Test Reduce', () => {
  expect(run.reduce(4, 'dabAcCaCBAcCcaDA')).toEqual([3,'dabAaCBAcCcaDA']);
  expect(run.reduce(3, 'dabAaCBAcCcaDA')).toEqual([2,'dabCBAcCcaDA']);
  expect(run.reduce(2,'dabCBAcCcaDA')).toEqual([3,'dabCBAcCcaDA']);
  expect(run.reduce(6,'dabCBAcCcaDA')).toEqual([5,'dabCBAcaDA']);
})


