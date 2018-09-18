# webpack入门（2）

<font color="darkOrchid">ps：每个案例都是基于前一个案例改造的</font>

webpack入门（1） [戳这里](http://www.cnblogs.com/sakurayeah/p/7837314.html)

<br/>

*** 

<br/>

## 十二、ProvidePlugin

自动加载模块

new webpack.ProvidePlugin()

上面的案例太复杂，下面再新建一个简单的项目来讲解

<br>

***

<br>

### 案例16 -- 全局引入jquery

新建一个项目，如下
```
[webpack]
  |-- src
    |-- index.html
    |-- index.less
    |-- index.js
  |-- package.json
  |-- webpack.config.js
```

<font color="orange">webpack/package.json</font>
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "webpack-dev-server --content-base build --inline --hot",
    "build": "webpack -p",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.7",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^1.1.5",
    "html-webpack-plugin": "^2.30.1",
    "jquery": "^3.2.1",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.0",
    "url-loader": "^0.6.2",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.9.5"
  }
}
```

<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js',
    jquery: [ "jquery" ]
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  module: {
    loaders: [
      {
        test: /\.js$/,  // js-loader
        loader: 'babel-loader?presets=es2015'
      },
      {
        test: /\.css$/, // css-loader
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index', 'jquery'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'jquery' // 对应entry的key
    }),
    new webpack.ProvidePlugin({ // 全局引入jquery
      $: 'jquery'
    })
  ]
}
```

<font color="orange">webpack/src/index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpackDemo</title>
</head>
<body>
  
</body>
</html>
```

<font color="orange">webpack/src/index.less</font>
```less
body {
  background: lightpink;
}
```

<font color="orange">webpack/src/index.js</font>
```javascript
import './index.less';
$('body').prepend('hi');
```

在webpack.config.js里设置了全局引入jquery，这里就不需要
```javscript
import $ from 'jquery'
```
可以直接用 $

$ npm run start , 打开 http://localhost:8080/index.html , 效果如下

![39](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171214174727685-1039763810.jpg)



<br>

***

<br>


## 十三、iconfont

[点击这里下载 案例17 使用的iconfont文件](https://files.cnblogs.com/files/sakurayeah/webpack%E6%9E%84%E5%BB%BA-%E6%A1%88%E4%BE%8B16-iconfont.zip)，以下简称“案例17压缩包”

<br>

***

<br>

### 案例17

新增文件 iconfont.less 和 iconfont.ttf(案例17压缩包里的iconfont.ttf)，将index.less移动至css文件夹下，如下
```
[webpack]
  |-- src
    |-- images
      |-- iconfont.ttf
    |-- css
      |-- iconfont.less
      |-- index.less
    |-- index.html
    |-- index.js
  |-- package.json
  |-- webpack.config.js
```


<font color="orange">webpack/src/css/iconfont.less</font>
```less
@font-face {
  font-family: "iconfont";
  src: url('../images/iconfont.ttf') format('truetype');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-love:before { content: "\e612"; }
```

<font color="orange">webpack/src/css/index.less</font>
```less
@import './iconfont.less';
body {
  background: lightpink;
  .iconfont {
    font-size: 50px;
  }
}
```

<font color="orange">webpack/src/index.js</font>
```javascript
import './css/index.less';
$('body').prepend('<i class="iconfont icon-love"></i>');
```

<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js',
    jquery: [ "jquery" ]
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  module: {
    loaders: [
      {
        test: /\.js$/,  // js-loader
        loader: 'babel-loader?presets=es2015'
      },
      {
        test: /\.css$/, // css-loader
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|ttf)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index', 'jquery'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'jquery' // 对应entry的key
    }),
    new webpack.ProvidePlugin({ // 全局引入jquery
      $: 'jquery'
    })
  ]
}
```

本案例只引入了ttf，其他可以类似添加
```js
{
  test: /\.(png|jpg|ttf|svg|eot|woff)$/, // img-loader
  loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
}
```

$ npm run start , 打开 http://localhost:8080/index.html ，效果如下

![40](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171214174759857-752858168.jpg)


$ npm run build , iconfont.ttf文件小会转为base64直接打包到index.css里，如果文件比较大，则会单独打包到webpack/build/images/iconfont.ttf



<br>

***

<br>

## 十四、externals

externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。

比如 jquery 希望通过 cdn 的方式引入，代码里依旧用 import 的方式来使用，但是又不希望被打包。

<br>

***

<br>

### 案例18

<font color="orange">webpack/src/index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpackDemo</title>
</head>
<body>
  <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
</body>
</html>
```

<font color="orange">webpack/src/index.js</font>
```js
import $ from 'jquery';
import './css/index.less';
$('body').prepend('<i class="iconfont icon-love"></i>');
```

<font color="orange">webpack/webpack.config.js</font>
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js'
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  externals: {
    jquery: 'jQuery' // jquery不被webpack编译到文件中
  },
  module: {
    loaders: [
      {
        test: /\.js$/,  // js-loader
        loader: 'babel-loader?presets=es2015'
      },
      {
        test: /\.css$/, // css-loader
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|ttf)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}
```

运行 $ npm run build , 生成文件目录如下
```
[webpack]
  |-- build
    |-- index.css
    |-- index.html
    |-- index.js
```

<br>

***

<br>

## 十五、react

安装依赖  
$ npm i babel-preset-react react react-dom --save-dev

<br>

***

<br>

### 案例19

<font color="orange">webpack/src/index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpackDemo</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

<font color="orange">webpack/src/index.js</font>
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.less';

class Demo extends React.Component {
  render() {
    return (
      <i  className="iconfont icon-love" />
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);
```

<font color="orange">webpack/webpack.config.js</font>
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js'
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,  // js-loader
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.css$/, // css-loader
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|ttf)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}
```

需要babel-preset-react插件来编译React

运行 $ npm run start , 打开 http://localhost:8080/ ，能看到效果

运行 $ npm run build ，打包文件目录如下：
```
[webpack]
  |-- build
    |-- index.css
    |-- index.html
    |-- index.js
```
react被打包到webpack/build/index.js里去了

<br>

***

<br>

### 案例20 -- react 通过 cdn 的方式引入

<font color="orange">webpack/src/index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpackDemo</title>
</head>
<body>
  <div id="root"></div>
  <script src="https://cdn.bootcss.com/react/15.4.2/react.min.js"></script>
  <script src="https://cdn.bootcss.com/react/15.4.2/react-dom.min.js"></script>
</body>
</html>
```

<font color="orange">webpack/webpack.config.js</font>
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js'
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,  // js-loader
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.css$/, // css-loader
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|ttf)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}
```

这样 react 就不会被打包入 webpack/build/index.js


<br>

***

<br>


## 十六、devServer

+ hot : boolean , 启用 webpack 的模块热替换特性
+ inline : boolean , 内联模式(默认) , false 时为 iframe 模式
+ contentBase : boolean|string|array , 设定webpack-dev-server的director根目录。如果不进行设定的话，默认是在当前目录下。
+ compress : boolean , 一切服务都启用 gzip 压缩
+ port : number , 指定要监听请求的端口号
+ host : string , 指定使用一个 host
+ proxy : object , webpack 代理
+ filename : string , 可以只在某个文件时被请求时编译
+ headers : object , 在所有请求中添加首部内容

[更多参数戳这里](https://doc.webpack-china.org/configuration/dev-server)



<br>

***

<br>



### 案例21

新建一个项目如下
```
[webpack]
  |-- package.json
  |-- webpack.config.js
  |-- src
    |-- index.html
    |-- index.js
    |-- images
      |-- SpongeBob.jpg
    |-- css
      |-- index.less
```

本案例用到的图片 [SpongeBob.jpg 戳这里](http://images.cnblogs.com/cnblogs_com/sakurayeah/1133161/o_SpongeBob.jpg)

<font color="orange">webpack/package.json</font>
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack -p"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.7",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^1.1.5",
    "html-webpack-plugin": "^2.30.1",
    "jquery": "^3.2.1",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.0",
    "url-loader": "^0.6.2",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.9.5"
  }
}
```


<font color="orange">webpack/webpack.config.js</font>
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js'
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  externals: {
    'jquery': 'jQuery', // 不打包jquery
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,  // js-loader
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|ttf)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  devServer: {
    contentBase: './build',
    inline: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}
```

<font color="orange">webpack/src/index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpackDemo</title>
</head>
<body>
  <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
</body>
</html>
```

<font color="orange">webpack/src/css/index.less</font>
```less
body {
  background: url(../images/SpongeBob.jpg) no-repeat;
  color: blue;
}
```

<font color="orange">webpack/src/index.js</font>
```js
import './css/index.less';

$('body').prepend('hi')
```


package.json 对比
```js
// 案例16
"scripts": {
  "start": "webpack-dev-server --content-base build --inline --hot",
}
// 案例21
"scripts": {
  "start": "webpack-dev-server",
}
```

案例21 中 webpack-dev-server 后的参数，改为在 webapck.config.js 中设置
```js
{
  devServer: {
    contentBase: './build',
    inline: true,
    hot: true
  },
  plugins: [ new webpack.HotModuleReplacementPlugin() ]
}
```

$ npm run start , 打开 http://localhost:8080/ , 效果如下

![41](https://images2018.cnblogs.com/blog/1009686/201712/1009686-20171225162202290-922471789.jpg)



<br>

***

<br>




## 十七、本地 mock 模拟后端数据

```js
{
  devServer: {
    before: (app) =>{
      app.get('/init.json', function(req, res) {
        res.json({ title: 'webpack' });
      });
    }
  }
}
```


<br>

***

<br>

### 案例22

<font color="orange">webpack/webpack.config.js</font>
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js'
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  externals: {
    'jquery': 'jQuery', // 不打包jquery
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,  // js-loader
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|ttf)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  devServer: {
    contentBase: './build',
    inline: true,
    hot: true,
    before: (app) =>{
      app.get('/init.json', function(req, res) {
        res.json({ title: 'webpack' });
      });
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}
```

<font color="orange">webpack/src/index.js</font>
```js
import './css/index.less';

$.ajax({
  url: '/init.json',
  data: {},
  type: 'GET',
  success: (d = {}) => {
    $('body').prepend(d.title);
  },
  error: () => {
    $('body').prepend('ajax error');
  }
});
```

$ npm run start , 打开 http://localhost:8080/index.html , 效果如下

![42](https://images2018.cnblogs.com/blog/1009686/201712/1009686-20171225162219603-1975982702.jpg)



<br>

***

<br>



## 十八、环境变量

DefinePlugin 可以把命令行的环境变量带到浏览器端。

```js
new webpack.DefinePlugin()
```

[详解戳这里](http://www.css88.com/doc/webpack/plugins/define-plugin/)


<br>

***

<br>



### 案例23

环境变量在很多情况都会使用，这里举一个例子，比如我们本地 mock 数据时，请求都是 "localhost:8080" 开头的，但是到线上了则是 "http://a.com" 和 "http://b.com" , 这个时候就可以使用 DefinePlugin 来解决

<font color="orange">webpack/package.json</font>
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "NODE_ENV=mock webpack-dev-server",
    "prod": "NODE_ENV=prod webpack-dev-server",
    "build-start": "NODE_ENV=mock webpack -p",
    "build-prod": "NODE_ENV=prod webpack -p"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.7",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^1.1.5",
    "html-webpack-plugin": "^2.30.1",
    "jquery": "^3.2.1",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.0",
    "url-loader": "^0.6.2",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.9.5"
  }
}
```

"NODE_ENV=xxx" , 可以定义不同环境的 NODE_ENV

start 和 build-start , 是我们本地开发时使用 ; prod 和 build-prod , 是线上环境使用

<font color="orange">webpack/webpack.config.js</font>
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log('----------- NODE_ENV ----------- : ', process.env.NODE_ENV)

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js'
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  externals: {
    'jquery': 'jQuery', // 不打包jquery
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,  // js-loader
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|ttf)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  devServer: {
    contentBase: './build',
    inline: true,
    hot: true,
    before: (app) =>{
      app.get('/init.json', function(req, res) {
        res.json({ title: 'webpack' });
      });
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}
```

通过 process.env.NODE_ENV 变量拿到值

$ npm run start , 效果如下

![43](https://images2018.cnblogs.com/blog/1009686/201712/1009686-20171225162231869-281188118.jpg)


$ npm run prod , 效果如下

![44](https://images2018.cnblogs.com/blog/1009686/201712/1009686-20171225162242650-1489072214.jpg)


<font color="orange">webpack/webpack.config.js</font>
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const checkHost = {
  "mock": {
    "A_HOST": "http://localhost:8080",
    "B_HOST": "http://localhost:8080",
  },
  "prod": {
    "A_HOST": "http://a.com",
    "B_HOST": "http://b.com",
  }
}

var checkHostKey = checkHost[process.env.NODE_ENV] ? process.env.NODE_ENV : 'mock';

var checkHostContent = checkHost[checkHostKey];

for (i in checkHostContent) {
  checkHostContent[i] = JSON.stringify(checkHostContent[i]);
}

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js'
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  externals: {
    'jquery': 'jQuery', // 不打包jquery
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,  // js-loader
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|ttf)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  devServer: {
    contentBase: './build',
    inline: true,
    hot: true,
    before: (app) =>{
      app.get('/init.json', function(req, res) {
        res.json({ title: 'webpack' });
      });
    }
  },
  plugins: [
    new webpack.DefinePlugin(checkHostContent),
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}
```

分析如下

```js
const checkHost = {
  "mock": { // 本地 mock 数据使用
    "A_HOST": "http://localhost:8080",
    "B_HOST": "http://localhost:8080",
  },
  "prod": { // 线上环境使用
    "A_HOST": "http://a.com",
    "B_HOST": "http://b.com",
  }
}

// 检查 checkHost[process.env.NODE_ENV] 是否存在，不存在时，将rocess.env.NODE_ENV 设置为 mock
var checkHostKey = checkHost[process.env.NODE_ENV] ? process.env.NODE_ENV : 'mock';

// checkHostContent 相当于是 checkHost.mock 或 checkHost.prod
var checkHostContent = checkHost[checkHostKey];

// 如果 DefinePlugin 键值是一个字符串，它会被当作一个代码片段来使用，需要 JSON.stringify() 处理
for (i in checkHostContent) {
  checkHostContent[i] = JSON.stringify(checkHostContent[i]);
}

// 将处理好的 checkHostContent 放入
module.exports = {
  plugins: [new webpack.DefinePlugin(checkHostContent)]
}
```

这一部分代码，将我们要用到的 A_HOST 和 B_HOST 都处理好，再放入new webpack.DefinePlugin()，拿 prod 举例，相当于处理成

```js
module.exports = {
  plugins: [new webpack.DefinePlugin({
    A_HOST: JSON.stringify("http://a.com"),
    B_HOST: JSON.stringify("http://b.com"),
  })]
}
```

<font color="orange">webpack/src/index.js</font>
```js
import './css/index.less';

console.log(A_HOST, B_HOST)

$.ajax({
  url: `${A_HOST}/init.json`,
  data: {},
  type: 'GET',
  success: (d = {}) => {
    $('body').prepend(d.title);
  },
  error: () => {
    $('body').prepend('ajax error');
  }
});
```

$ npm run start , 效果如下

![45](https://images2018.cnblogs.com/blog/1009686/201712/1009686-20171225162255181-1733300594.jpg)


$ npm run prod , 效果如下

![46](https://images2018.cnblogs.com/blog/1009686/201712/1009686-20171225162304853-439167576.jpg)


当然，也可以直接写两个 webpack.config.js 文件，这里就贴一下代码，不具体写案例了

```js
// webpack.start.config.js
module.exports = {
  plugins: [new webpack.DefinePlugin({
    A_HOST: JSON.stringify("http://localhost:8080"),
    B_HOST: JSON.stringify("http://localhost:8080"),
  })]
}

// webpack.prod.config.js
module.exports = {
  plugins: [new webpack.DefinePlugin({
    A_HOST: JSON.stringify("http://a.com"),
    B_HOST: JSON.stringify("http://b.com"),
  })]
}

// package.json
{
  "scripts": {
    "start": "webpack-dev-server --config webpack.start.config.js",
    "prod": "webpack-dev-server --config webpack.prod.config.js",
    "build-start": "webpack -p --config webpack.start.config.js",
    "build-prod": "webpack -p --config webpack.prod.config.js"
  }
}
```


<br>

***

<br>



## 十九、server.js


[详细介绍戳这里](https://webpack.github.io/docs/webpack-dev-server.html#api)


<br>

***

<br>


### 案例24

新增 webpack/server.js , 目录如下 
```
[webpack]
  |-- server.js
  |-- package.json
  |-- webpack.config.js
  |-- src
    |-- index.html
    |-- index.js
    |-- images
      |-- SpongeBob.jpg
    |-- css
      |-- index.less
```

<font color="orange">webpack/webpack.config.js</font>
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const checkHost = {
  "mock": { // 本地 mock 数据使用
    "A_HOST": "http://localhost:8080",
    "B_HOST": "http://localhost:8080",
  },
  "prod": { // 线上环境使用
    "A_HOST": "http://a.com",
    "B_HOST": "http://b.com",
  }
}

// 检查 process.env.NODE_ENV 是否和 checkHost 里的对应
var checkHostKey = checkHost[process.env.NODE_ENV] ? process.env.NODE_ENV : 'mock';

// checkHostContent 相当于是 checkHost.mock 或 checkHost.prod
var checkHostContent = checkHost[checkHostKey];

// 如果 DefinePlugin 键值是是一个字符串，它会被当作一个代码片段来使用，需要 JSON.stringify() 处理
for (i in checkHostContent) {
  checkHostContent[i] = JSON.stringify(checkHostContent[i]);
}

module.exports = {
  entry: { // 入口文件地址
    index: ['./src/index.js']
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  externals: {
    'jquery': 'jQuery', // 不打包jquery
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,  // js-loader
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|ttf)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin(checkHostContent), // 将处理好的 checkHostContent 放入
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}
```

将 devServer 删除 , entry.index 改为 array 写法

<font color="orange">webpack/server.js</font>
```js
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
```

webpack-dev-server 的配置里没有 inline : true 这个配置项, 因为 webpack-dev-server 无法访问 webpack 的配置。 因此，用户必须添加 webpack-dev-server 的客户端入口文件到 webpack 的配置中，有以下几种方式（上面案例只写了一种，其他大家可以自行尝试）

```js
// server.js
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

// webpack.config.js
{
  entry: {
    index: [
     'webpack-dev-server/client?http://localhost:8080/',
     './src/index.js'
    ]
  }
}
// index.html
<script src="http://localhost:8080/webpack-dev-server.js"></script>
```

<font color="orange">webpack/package.json</font>
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "NODE_ENV=mock node server.js",
    "prod": "NODE_ENV=prod node server.js",
    "build-start": "NODE_ENV=mock webpack -p",
    "build-prod": "NODE_ENV=prod webpack -p"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.7",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^1.1.5",
    "html-webpack-plugin": "^2.30.1",
    "jquery": "^3.2.1",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.0",
    "url-loader": "^0.6.2",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.9.5"
  }
}
```

修改了 scripts.start 和 scripts.prod ，$ npm run start 和 $ npm run prod ，效果和 案例23 一样


<br>

***

<br>


## 二十、module.rules

下面介绍一下 loaders 的其他写法


<br>

***

<br>

### 案例25

<font color="orange">webpack/server.js</font>
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const checkHost = {
  "mock": { // 本地 mock 数据使用
    "A_HOST": "http://localhost:8080",
    "B_HOST": "http://localhost:8080",
  },
  "prod": { // 线上环境使用
    "A_HOST": "http://a.com",
    "B_HOST": "http://b.com",
  }
}

// 检查 process.env.NODE_ENV 是否和 checkHost 里的对应
var checkHostKey = checkHost[process.env.NODE_ENV] ? process.env.NODE_ENV : 'mock';

// checkHostContent 相当于是 checkHost.mock 或 checkHost.prod
var checkHostContent = checkHost[checkHostKey];

// 如果 DefinePlugin 键值是是一个字符串，它会被当作一个代码片段来使用，需要 JSON.stringify() 处理
for (i in checkHostContent) {
  checkHostContent[i] = JSON.stringify(checkHostContent[i]);
}

module.exports = {
  entry: { // 入口文件地址
    index: ['./src/index.js']
  },
  output: { // 出口
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js' // 文件名，name即为entry的key
  },
  externals: {
    'jquery': 'jQuery', // 不打包jquery
  },
  module: {
    rules: [ // loaders
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }]
        })
      },
      {
        test: /\.(png|jpg|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash:8].[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(checkHostContent), // 将处理好的 checkHostContent 放入
    new webpack.HotModuleReplacementPlugin(), // 启用热替换模块
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({ // 单独打包css
      filename: '[name].css'
    })
  ]
}
```

对比分析如下
```js
{
  module: {
    // module.loaders 改为 module.rules
    rules: [
      // {
      //   test: /\.(js|jsx)$/,  // js-loader
      //   loader: 'babel-loader?presets[]=es2015&presets[]=react'
      // }
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: { // ? 后的参数可以写在这里
            presets: ['es2015', 'react']
          }
        }
      },
      // {
      //   test: /\.less/, // less-loader
      //   loaders: ExtractTextPlugin.extract('css-loader!less-loader')
      // }
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }]
        })
      },
      // {
      //   test: /\.(png|jpg|ttf)$/, // img-loader
      //   loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      // }
      {
        test: /\.(png|jpg|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash:8].[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
```