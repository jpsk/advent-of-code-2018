const utils = require('../utils');
const run = require('./run');

const input = utils.readInput(__dirname).split('\n').map(i => parseInt(i, 10));

console.log(run(input));
