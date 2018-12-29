module.exports = function (wallaby) {
  return {
    files: [
      'day*/src/**/*.js',
      'day*/**/*.js',
      '!day*/**/*test.js',
      '!day*/*test.js',
    ],

    tests: [
      'day*/**/*test.js',
      'day*/*test.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

  };
};