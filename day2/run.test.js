const run = require('./run');

test('Test1', () => {
  const inp = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'];
  expect(run.part1(inp)).toEqual(12);
});

test('Test2', () => {
  const inp = [
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz'
  ];
  expect(run.part2(inp)).toEqual('fgij');
})
