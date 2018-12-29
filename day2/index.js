const run = require('./run');
const utils = require('../utils');

const input = utils.readInput(__dirname).split('\n');

// Part1
utils.executeFn(run.part1, input, 'Day 2, Part 1');

// Part2
utils.executeFn(run.part2, input, 'Day 2, Part 2');