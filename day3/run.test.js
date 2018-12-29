const run = require('./run');

const testInput = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

test('Part1 Test1', () => {
  expect(run.part1(['#123 @ 3,2: 5x4'])).toEqual(0);
});

test('Part1 Test2', () => {
  expect(run.part1(testInput)).toEqual(4);
});

test('Part2 Test1', () => {
  expect(run.part2(testInput)).toEqual('#3');
})
