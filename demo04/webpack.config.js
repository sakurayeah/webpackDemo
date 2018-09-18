var webpack = require('webpack');
module.exports = {
  entry: { // 入口文件地址
    app: './src/index.js',
    main: './src/main.js'
  },
  output: { // 输出文件地址和名字
    filename: './build/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,  // js-loader
        loader: 'babel-loader?presets=es2015'
      },
      {
        test: /\.css$/, // css-loader
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less/, // less-loader
        loaders: 'style-loader!css-loader!less-loader'
      }
    ],
  }
}