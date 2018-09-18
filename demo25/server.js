// 引入 webpack 和 webpack-dev-server
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// 引入 webpack 的配置
var config = require('./webpack.config.js');

// 添加 webpack-dev-server 的客户端入口文件到 webpack 的配置中
// 通过 unshift 方法，将 webpack-dev-server/client?http://«path»:«port»/ 插入到 webpack-dev-server 配置的 entry.index 中
config.entry.index.unshift("webpack-dev-server/client?http://localhost:8080/");

// compiler = webpack({ webpack 的配置 })
var compiler = webpack(config);

// server = new WebpackDevServer(compiler, { devServer 的配置 })
var server = new WebpackDevServer(compiler, {
  contentBase: './build',
  inline: true,
  hot: true,
  before: (app) =>{
    app.get('/init.json', function(req, res) {
      res.json({ title: 'webpack' });
    });
  }
});

server.listen(8080, "localhost", function() {});