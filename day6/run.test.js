const run = require('./run');
const testInput = [
  [1, 1],
  [1, 6],
  [8, 3],
  [3, 4],
  [5, 5],
  [8, 9]
];

test('calculateDistanceToPoint', () => {
  expect(run.calculateDistanceToPoint(0, 0, [0, 0])).toEqual(0);
  // Around the point
  expect(run.calculateDistanceToPoint(1, 1, [0, 1])).toEqual(1);
  expect(run.calculateDistanceToPoint(1, 1, [1, 0])).toEqual(1);
  expect(run.calculateDistanceToPoint(1, 1, [1, 2])).toEqual(1);
  expect(run.calculateDistanceToPoint(1, 1, [2, 1])).toEqual(1);
  expect(run.calculateDistanceToPoint(1, 1, [0, 0])).toEqual(2);
  expect(run.calculateDistanceToPoint(1, 1, [2, 2])).toEqual(2);
  expect(run.calculateDistanceToPoint(1, 1, [3, 1])).toEqual(2);
  expect(run.calculateDistanceToPoint(1, 1, [1, 3])).toEqual(2);
})

test('Calculate squareowner', () => {
  const candidates = [
    [1, 1],
    [1, 6],
    [8, 3],
    [3, 4],
    [5, 5],
    [8, 9]
  ];
  const normalized = run.normalizeInput(candidates);
  expect(run.findSquareOwner(3, 3, normalized)).toEqual('3');
  expect(run.findSquareOwner(9, 9, normalized)).toEqual('5');
  expect(run.findSquareOwner(5, 0, normalized)).toEqual('*');
})

test('Part1 Test1', () => {
  expect(run.part1(testInput)).toEqual(17);
})


test('Part2 Test1', () => {
  const coords = [
    [1, 1],
    [1, 6],
    [8, 3],
    [3, 4],
    [5, 5],
    [8, 9]
  ];
  const normalized = run.normalizeInput(coords);
  expect(run.part2(coords, 32)).toEqual(16);
})
