const AllowMutateEsmExportsPlugin = require('./AllowMutateEsmExportsPlugin.js');
const webpackConf = require('./webpack.config.js');
webpackConf.mode = 'development';
webpackConf.devtool = 'eval-source-map';
webpackConf.plugins.push(new AllowMutateEsmExportsPlugin());

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['test/**/*.test.js', 'performance.test/**/*.test.js'],
    exclude: [],
    preprocessors: {
      'test/**/*.test.js': ['webpack'],
      'performance.test/**/*.test.js': ['webpack']
    },
    webpack: webpackConf,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
