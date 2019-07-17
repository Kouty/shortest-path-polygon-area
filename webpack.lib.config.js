const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.lib.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'sppa.js',
    library: 'SPPA'
  },
  plugins: [new CleanWebpackPlugin(['./lib'])]
};
