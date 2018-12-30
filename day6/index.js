const run = require('./run');
const utils = require('../utils');

const input = utils.readInput(__dirname)
  .split('\n')
  .map(x => x.split(', ').map(y => parseInt(y, 10)));

// Part1
utils.executeFn(run.part1, input, 'Day 5, Part 1');

// Part2
utils.executeFn(run.part2, input, 'Day 5, Part 2');
