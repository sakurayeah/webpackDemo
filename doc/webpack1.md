# webpack入门（1）

[源码戳这里](https://github.com/sakurayeah/webpackDemo)
<font color="red">ps：每个案例对应相应的demo，例如“案例1”对应“demo1”</font>

## 一、webpack基本功能及简单案例

- 安装webpack  
  $ npm i webpack -g

- 基本功能  
  $ webpack -v 查看webpack版本号    
  $ webpack 最基本的启动webpack的方法   
  $ webpack -w 提供watch方法；实时进行打包更新  
  $ webpack -p 对打包后的文件进行压缩  
  $ webpack -d 提供source map，方便调式代码
  $ webpack --display-error-details 显示更多报错信息   
  $ webpack --config webpack.config2.js  使用另一份配置文件webpack.config2.js来打包   
  $ webpack --progress 显示进度条   
  $ webpack --color 添加颜色   

<br>

***

<br>

###  案例1

构建项目文件夹, 目录如下
```
[webpack]
  |-- src
    |-- index.js
    |-- index.less
    |-- index.html
  |-- package.json
  |-- webpack.config.js
```

<font color="orange">webpack/src/index.html</font> 内容如下
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>

</body>
<script src='../build/app.js'></script>
</html>
```

<font color="orange">webpack/src/index.less</font> 内容如下
```less
body {
  background: yellow;
}
```

<font color="orange">webpack/src/index.js</font> 内容如下
```js
console.log(123)
```

运行 $ npm init , 入下图所示

![2](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206122944222-550868678.jpg)


然后就看到<font color="orange">webpack/package.json</font>文件的内容, 如下
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

配置 webpack.config.js

<font color="orange">webpack/webpack.config.js</font> 文件的内容,如下
```js
var webpack = require('webpack');
module.exports = {
  entry: './src/index.js', // 入口文件地址
  output: {
    filename: './build/app.js' // 输出文件地址和名字
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
```

分析如下图

![5](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206123146581-1683465668.jpg)



安装依赖
- 安装webpack依赖
  $ npm i webpack --save-dev  
  $ npm i webpack@x.x.x --save-dev(安装指定版本的webpack)

- 安装css依赖
  $ npm i css-loader --save-dev  
  $ npm i style-loader --save-dev  

- 安装less依赖
  $ npm i less --save-dev  
  $ npm i less-loader --save-dev  

- 安装es6依赖
  $ npm i babel-loader --save-dev
  $ npm i babel-preset-es2015 --save-dev
  $ npm i babel-core --save-dev


这个时候再看webpack/package.json文件，就会发现多了一部分内容，如下图所示

![7](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206123215597-1354751625.jpg)



运行 $ webpack , 会发现项目文件夹下多了一个文件 webpack/build/app.js , 如下图所示

![3](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206123229066-1073445034.jpg)


打开在浏览器打开 webpack/src/index.html ，会看到如下图所示
    
![4](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153102097-1074605049.jpg)


这样我们已经有了一个简单的案例，在入口文件index.js里引入相关的依赖，然后通过webpack把他们打包好，并生成到build/app.js文件里。在index.html里只需要引入app.js文件，就能够看到背景色和console.log打印的值。


如下图所示

![6](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153119425-1198261282.jpg)


<font color="orange">webpack/package.json</font>
```json
{
    "name": "webpack",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
        "start": "webpack",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "babel-core": "^6.26.0",
        "babel-loader": "^7.1.2",
        "babel-preset-es2015": "^6.24.1",
        "css-loader": "^0.28.7",
        "less": "^2.7.3",
        "less-loader": "^4.0.5",
        "style-loader": "^0.19.0",
        "webpack": "^3.8.1"
    }
}
```

将webpack/build文件夹删除，运行$ npm run start，也能生成webpack/build/app.js


<br>

***

<br>

## 二、简单介绍下package.json中的devDependencies的版本号
+ 以devDependencies中，webapck的版本号为例

  | devDependencies的版本号写法   | 安装依赖的版本            |
  | --------------------------- |:--------------:|
  | "webpack": "3.8.1"          | 等于3.8.1    |
  | "webpack": "~3.8.1"         | 3.8.x，不会安装3.9.x或者3.7.x   |
  | "webpack": "^3.8.1"         | 3.x.x，不会安装4.x.x或者2.x.x   |
  | "webpack": ">3.8.1"         | 大于3.8.1    |
  | "webpack": ">=3.8.1"        | 大于等于3.8.1   |
  | "webpack": "<=3.8.1"        | 小于等于3.8.1   |

<br>

***

<br>

## 三、 webpack-dev-server
轻量级的服务器，可以修改代码后，在页面上看到修改完的效果，[详细介绍戳这里](http://www.jianshu.com/p/941bfaf13be1)

安装依赖
$ npm i webpack-dev-server -g
$ npm i webpack-dev-server --save-dev


<br>

***

<br>

### 案例2
<font color="blue">ps:每个案例都是基于前一个案例的内容改造，没有提到的文件和前一个案例内容一样</font>

运行 $ webpack-dev-server , 如下图
![8](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153239456-468029484.jpg)


在浏览器打开连接 http://localhost:8080/src/ ，就能看到案例一的效果了

<font color="orange">webpack/src/index.js</font>
```js
import './index.less';
const fn = () => {
  document.write('hi!')
}
fn();
```

这个时候在页面能够实时更新，如下图所示

![9](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153533581-911000637.jpg)


改造 webpack/package.json

<font color="orange">webpack/package.json</font>
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.7",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.0",
    "webpack": "^3.8.1",
    "webpack-dev-server": "^2.9.3"
  }
}
```

![10](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153305566-629646280.jpg)


可选的参数
  + --content-base: 设定webpack-dev-server的director根目录。如果不进行设定的话，默认是在当前目录下。  
  + --quiet: 控制台中不输出打包的信息，开发中一般设置为false，进行 打印，这样查看错误比较方面  
  + --no-info: 不显示任何信息  
  + --colors: 对信息进行颜色输出  
  + --no-colors: 对信息不进行颜色输出  
  + --compress: 开启gzip压缩  
  + --host <hostname/ip>: 设置ip  
  + --port <number>: 设置端口号，默认是:8080  
  + --inline: webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口,  
  + --hot: 开发热替换  
  + --open: 启动命令，自动打开浏览器  
  + --history-api-fallback: 查看历史url
  + [更多参数戳这里](https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli)

  
    
下面以“--port”举例
    
<font color="orange">webpack/package.json</font>
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "start": "webpack-dev-server --port 7777",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.7",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.0",
    "webpack": "^3.8.1",
    "webpack-dev-server": "^2.9.3"
  }
}
```

![11](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153346206-989611876.jpg)


运行 $ npm run start

![12](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153612269-872919422.jpg)


浏览器打开页面 http://localhost:7777/src/ ，即可看效果

webpack-dev-server后写多个参数：webpack-dev-server --hot --inline


<br>

***

<br>


## 四、output和entry

entry：入口文件，简单说就是要打包的文件。

output: 出口文件，简单说就是打包生成的文件。

entry有三种类型的值：字符串、数组、对象。案例一和案例二都是字符串的方式，下面来看下数组（案例三）和对象（案例四）的写法

<br>

***

<br>


### 案例3 --- entry值为数组的写法，多个入口对一个出口

新增文件 webpack/src/main.js，如下图

![14](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153630191-2013650.jpg)


<font color="orange">webpack/src/main.js</font>
```javascript
console.log('123')
```

<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
module.exports = {
  entry: ['./src/index.js', './src/main.js'], // 入口文件地址
  output: {
    filename: './build/app.js' // 输出文件地址和名字
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
```

运行 $ npm run build，index.js和main.js两个文件最后生成一个webpack/build/app.js文件

运行 $ npm run start，打开 http://localhost:7777/src/ ，可以看到两个文件里的代码都生效了，如下图所示

![15](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153710534-1080583315.jpg)


<br>

***

<br>


### 案例4 --- entry值为对象的写法，多个入口对多个出口

<font color="orange">webpack/webpack.config.js</font>

```javascript
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
```

<font color="orange">webpack/src/index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>

</body>
<script src='../build/app.js'></script>
<script src='../build/main.js'></script>
</html>
```

运行 $ npm run build，会生成webpack/build/app.js和webpack/build/main.js

![13](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153759706-259299188.jpg)


将main.js也在index.html里引入一下，就能看见和案例三一样的效果



<br>

***

<br>

### 案例5 --- output的path和publicPath


<font color="orange">webpack/package.json</font>
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "start": "webpack-dev-server --content-base --inline --hot --port 7777",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.7",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.0",
    "webpack": "^3.8.1",
    "webpack-dev-server": "^2.9.3"
  }
}
```
webpack-dev-server的配置参数，可以去 案例2 的 可选的参数 里去找

<font color="orange">webpack/webpack.config.js</font>

```javascript
var webpack = require('webpack');
module.exports = {
  entry: { // 入口文件地址
    app: './src/index.js',
    main: './src/main.js'
  },
  output: { // 出口文件
    path: __dirname + "/build", // 打包后的文件存放路径
    filename: '[name].js', // 文件名，name即为entry的key
    publicPath: '/build' // 命令行模式下,一定要配置output.publicPath来指定编译后的包(bundle)的访问位置
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
```

__dirname：是一个全局变量，指当前执行脚本所在的目录

path和publicPath的区别：[戳这里](http://m.blog.csdn.net/HeliumLau/article/details/70666433)

运行 $ npm run build 和 $ npm run start (打开 http://localhost:7777/src/ ) 的效果和案例四一样

[name]不一定一定要是文件名，也可以是路径：  
filename: '[name]/min.js'  
可以自己运行下 $ webpack ， 看下生成的文件，这里就不贴图展示了


output里filename有三个值：  
· [name]是文件名字是entry的键值。  
· [hash]是md5加密的值。  
· [chunkhash]可以作为版本号使用。


<br>

***

<br>


## 五、html单独打包

安装依赖  
$ npm install html-webpack-plugin --save-dev

可选的配置：  
- title : 用于生成的HTML文件的标题。
- filename : 用于生成的HTML文件的名称，默认是index.html。也可以指定打包的目录，下面案例7中有介绍。
- template : 模板的路径。支持加载器，例如 html!./index.html。模板类型可以是html，jade，ejs，hbs等，注意要安装对应的loader
- inject : 注入选项，有四个值
  + true(默认，script标签位于html文件的 body 底部) 
  + ‘head’（script 标签位于 head 标签内）
  + ‘body’（同 true）
  + false（不插入生成的 js 文件，只是单纯的生成一个 html 文件
- favicon : 给定的图标路径，可将其添加到输出html中。
- minify : 值为对象或者false，对 html 文件进行压缩，false是默认选项，不压缩。html-minifier[详细文档戳这里](https://github.com/kangax/html-minifier#options-quick-reference)。
- hash : true | false。如果是true，会给所有包含的script和css添加一个唯一的webpack编译hash值，类似于我们常用的时间戳。这对于缓存清除非常有用。
- cache : true(默认) | false 。是否需要缓存，如果传入true，只有在文件变化时才发送（emit）文件。
- showErrors : true | false 。如果传入true（默认），错误信息将写入html页面。
- chunks : 主要是针对多入口(entry)文件，默认会在生成的 html 文件中引用所有的 js 文件，也可以指定引入哪些js。
- excludeChunks : 和chunks刚好相反，指定不需要引入的js。
- chunksSortMode : 决定了 script 标签的引用顺序。有四个值 
  + ‘auto’，默认，内置的排序方式
  + ‘none’，不排序
  + ‘dependency’，按照不同文件的依赖关系来排序
  + {function}，可以指定具体排序规则
- xhtml : 布尔值
  + false，默认
  + true，兼容 xhtml 的模式引用文件

<br>

***

<br>

### 案例6 --- html-webpack-plugin的基本用法


<font color="orange">webpack/package.json</font>
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "start": "webpack-dev-server --content-base build --inline --hot --port 7777 ",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.7",
    "html-webpack-plugin": "^2.30.1",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.0",
    "webpack": "^3.8.1",
    "webpack-dev-server": "^2.9.3"
  }
}
```
webpack-dev-server --content-base   
设定webpack-dev-server的director根目录。如果不进行设定的话，默认是在当前目录下。

webpack-dev-server --content-base build   
将build目录作为根目录。有一点需要注意的是，webpack-dev-server生成的包并没有放在你的真实目录中，而是放在了内存中。

<font color="orange">webpack/webpack.config.js</font>

```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { // 入口文件地址
    app: './src/index.js',
    main: './src/main.js'
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
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less/, // less-loader
        loaders: 'style-loader!css-loader!less-loader'
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin()]
}
```

![16](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153915191-1598453932.jpg)


运行 $ npm run build ，会发现html被单独打包出来了webpack/build/index.html，如下图所示

![17](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153924269-157279997.jpg)


运行 $ npm run start，打开 http://localhost:7777/ ，就能看到效果。因为我们默认打包后生成的html名就是index(主页面文件)，所以这里相当于是打开了 http://localhost:7777/index.html

<br>

***

<br>


### 案例7 --- html-webpack-plugin的title和filename


<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { // 入口文件地址
    app: './src/index.js',
    main: './src/main.js'
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
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less/, // less-loader
        loaders: 'style-loader!css-loader!less-loader'
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'demo',
      filename: 'demo.html'
  })]
}
```

![18](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153944003-1823002493.jpg)


filename是设置打包好的html文件名，title是设置html的标题。

运行 $ npm run build， 会将html打包webpack/build/demo.html，且页面标题为demo，如下图所示

![19](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206153952144-2006671504.jpg)


运行 $ npm run start，打开 http://localhost:7777/demo.html 看页面效果


filename其他写法：（下面介绍两种，大家自己试一下）
- filename: './dist/demo.html'。 则html会被打包成webpack/build/dist/demo.html
- filename: __dirname + '/dist/demo.html'。 则html会被打包到webpack/dist/demo.html



<br>

***

<br>


### 案例8 --- html-webpack-plugin的template和chunks，生成多个html


新建文件 webpack/src/main.html，如下图所示
![20](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154035191-19855410.jpg)


<font color="orange">webpack/src/main.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>main</title>
</head>
<body>

</body>
</html>
```

<font color="orange">webpack/src/index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>index</title>
</head>
<body>

</body>
</html>
```

<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { // 入口文件地址
    app: './src/index.js',
    main: './src/main.js'
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
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less/, // less-loader
        loaders: 'style-loader!css-loader!less-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'demo.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['app'] // 需要引入的js
    }),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './src/main.html',
      chunks: ['main']
    })
  ]
}
```
运行 $ npm run build，生成的文件如下所示
![21](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154024206-1354326598.jpg)

webpack/src/index.html打包生成webpack/build/demo.html，并且引入的js是app.js。 webpack/src/main.html打包生成的是webpack/build/main.html，js引入的是main.js。

template：需要打包的html的文件路径  
chunks：是一个数组，里面的值对应entry里的key，可以写多个，例如 chunks: ['app','main']

运行 $ npm run start, 分别打开 http://localhost:7777/main.html 和 http://localhost:7777/demo.html 可以看到页面效果




<br>

***

<br>

## 六、css单独打包

安装依赖 $ npm install extract-text-webpack-plugin --save-dev

new ExtractTextPlugin() 和 ExtractTextPlugin.extract() [详细介绍戳这里](https://github.com/webpack-contrib/extract-text-webpack-plugin)

1. ExtractTextPlugin.extract()，有三个参数：
  - 第一个参数是可选参数，传入一个loader，当css样式没有被抽取的时候可以使用该loader；
  - 第二个参数则是用于编译解析的css文件loader，很明显这个是必须传入的，就像上述例子的css-loader；
  - 第三个参数是一些额外的备选项，貌似目前只有传入publicPath，用于当前loader的路径。

2. new ExtractTextPlugin([id: string], filename: string, [options])  
  - [id: string]：该插件实例的唯一标志，一般是不会传的，其自己会生成
  - filename: 文件名，包含[name]、[id]、[contenthash]
    + [name]：将会和entry中的chunk的名字一致
    + [id]：将会和entry中的chunk的id一致
    + [contenthash]：根据内容生成hash值
  - options
    + allchunk： 是否将所有额外的chunk都压缩成一个文件
    + disable：禁止使用插件


<br>

***

<br>

### 案例9

新建文件webpack/src/main.css

<font color="orange">webpack/src/main.css</font>
```css
body {
  background: red;
}
```

<font color="orange">webpack/src/main.js</font>
```javascript
import './main.css';
console.log('123')
```

<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    app: './src/index.js',
    main: './src/main.js'
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
        loader: ExtractTextPlugin.extract(['css-loader'])
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
      }
    ],
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename: 'demo.html', // 生成的的html文件名
        template: './src/index.html', // 被打包的html路径
        chunks: ['app'] // 需要引入的js
      }),
      new HtmlWebpackPlugin({
        filename: 'main.html',
        template: './src/main.html',
        chunks: ['main']
      }),
      new ExtractTextPlugin("[name].css")
  ]
}
```
![23](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154119316-193713122.jpg)

这里写了css和less两种文件的打包，并生成对应的名字

运行 $ npm run build，效果如下

![22](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154128800-1379386909.jpg)

在index.js里引入的index.less，最后生成的app.css，并且在index.html中引用了。在main.js里引入的main.css，打包后生成main.css，并且在main.html中引用。

运行 $ npm run start, 分别打开 http://localhost:7777/main.html 和 http://localhost:7777/demo.html 可以看到页面效果。

这个时候会发现，如果修改js页面还是会自动刷新，如果修改css或者less，页面需要手动刷新才会看到最新的效果


<br>

***

<br>


## 七、图片的处理
安装依赖
$ npm i url-loader --save-dev  
$ npm i file-loader --save-dev

<br>

***

<br>

### 案例10

新增 webpack/src/images/Ahri.jpg  
![Ahri](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154557706-97925399.jpg)


新增 webpack/src/images/Minions.jpg  
![Minions](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154614941-1286135004.jpg)

<font color="orange">webpack/src/index.less</font>
```less
body {
  height: 500px;
  background: url('./images/Ahri.jpg') no-repeat center;
}
```

<font color="orange">webpack/src/main.css</font>
```css
body {
  background: url('./images/Minions.jpg') no-repeat;
}
```

<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    app: './src/index.js',
    main: './src/main.js'
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
        loader: ExtractTextPlugin.extract(['css-loader'])
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
      },
      {
        test: /\.(png|jpg)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'demo.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['app'] // 需要引入的js
    }),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './src/main.html',
      chunks: ['main']
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
}
```

运行 $ npm run start 

打开 http://localhost:7777/demo.html ，效果如下

![24](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154718003-1914218453.jpg)

打开 http://localhost:7777/main.html ，效果如下

![26](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154731441-736074779.jpg)

运行 $ npm run build，如下所示

![27](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154740956-57132436.jpg)

分析如下

![25](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154748691-198621931.jpg)

1. 除了png和jpg外，还可以添加gif等，以“|”分隔。
2. limit=8192，图片小于8192字节时以，转为base64引入，大于8192字节时，调用file-loader打包生成文件
3. name=images/[hash:8].[name].[ext]，“ images/ ”指定图片打包到文件夹webpack/build/images，“ [hash:8] ”指8位 hash 值


可以自己尝试下这种打包出来的结果：
```javascript
{
  test: /\.(png|jpg)$/, // img-loader
  loader: 'url-loader?limit=8192'
}
```
效果如下
![28](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171206154805269-1325663858.jpg)



<br>

***

<br>

## 八、引入jq

npm i jquery --save-dev

<br>

***

<br>

### 案例11

<font color="orange">webpack/src/index.js</font>
```javascript
import './index.less';
import $ from 'jquery';
$('body').prepend('hehe');
```

这样运行 $ npm run build，jquery被打包到app.js里了


<br>

***

<br>

## 九、CommonsChunkPlugin 打包公共文件
```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: xx, // 对应entry的key
  filename: xx, // 输出的文件名，如果不写这个则以name为输出的文件名
  chunks: xx // 只有在这个文件中引入的模块才能被打包
  minChunks: xx, // 符合引用次数的则被打包
})
```

<br>

***

<br>

### 案例12 --- 单一入口，分文件输出

<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    app: './src/index.js',
    // main: './src/main.js'
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
        loader: ExtractTextPlugin.extract(['css-loader'])
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
      },
      {
        test: /\.(png|jpg)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'demo.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['app', 'chunk'] // 需要引入的js
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'main.html',
    //   template: './src/main.html',
    //   chunks: ['main']
    // }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin("chunk")
  ]
}
```

![29](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208113705609-2131478178.jpg)


$ npm run build, 打包出来的结果如下：

![30](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208113714031-1889367330.jpg)


这里注意，chunk.js一定要在app.js之前引入

<br>

***

<br>

### 案例13 --- 多入口，分文件输出，jquery单独打包


<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: { // 入口文件地址
        app: './src/index.js',
        jquery: [ "jquery" ]
        // main: './src/main.js'
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
                loader: ExtractTextPlugin.extract(['css-loader'])
            },
            {
                test: /\.less/, // less-loader
                loaders: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
            },
            {
                test: /\.(png|jpg)$/, // img-loader
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'demo.html', // 生成的的html文件名
            template: './src/index.html', // 被打包的html路径
            chunks: ['app', 'jquery'] // 需要引入的js
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'main.html',
        //     template: './src/main.html',
        //     chunks: ['main']
        // }),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'jquery'
        })
    ]
}
```

![31](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208113750484-283892706.jpg)


运行 $ npm run build, 效果如下

![32](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208113801484-350726335.jpg)

通过webpack.optimize.CommonsChunkPlugin，将jquery单独打包到jquery.js中。如果不写这部分，app.js中也会被打包入jquery，大家可以自己尝试下。



<br>

***

<br>

### 案例14

<font color="orange">webpack/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    app: './src/index.js',
    main: './src/main.js',
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
        loader: ExtractTextPlugin.extract(['css-loader'])
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
      },
      {
        test: /\.(png|jpg)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ],
  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      filename: 'demo.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['app', 'jquery'] // 需要引入的js
    }),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './src/main.html',
      chunks: ['main']
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'jquery',
      chunks: ['app'] // 在app.js中引用的才被打包
    })
  ]
}
```

$ npm run build, main.js和app.js中均为打包入jquery，jquery被单独打包，并且仅在demo.html中引用。


<br>

***

<br>

## 十、js压缩
这里介绍两种方式大家自己运行 $ npm run build 试试，对比下压缩前后的效果

1. new webpack.optimize.UglifyJsPlugin()

  <font color="orange">webpack/webpack.config.js</font>的plugins添加如下
  ```javascript
  module.exports = {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  }
  ```
2. webpack -p

  <font color="orange">webpack/package.json</font>的scripts修改如下
  ```json
  "scripts": {
    "build": "webpack -p",
  },
  ```

<br>

***

<br>


## 十一、自动添加css前缀 postcss-loader

类似下面这种需要添加浏览器前缀等兼容的情况，每次自己写太麻烦，可以用postcss-loader帮助我们完成这些功能
```less
display: -webkit-box;
display: -ms-flexbox;
display: flex;
```

这里综合上面所讲的内容，从头写一个新的demo（简单的留言板效果）, 效果如下
![38](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208113853890-529907976.gif)


demo涉及到上面没有讲过的内容，如下：
+ atpl-loader，[写法戳这里](https://npm.taobao.org/package/atpl-loader)

<br>

***

<br>

### 案例15

新建项目文件夹 webpackDemo，文件目录如下

![33](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208113912671-445946369.jpg)

运行 $ npm init。

安装以下依赖 :  
babel-core  
babel-loader  
babel-preset-es2015  
css-loader  
extract-text-webpack-plugin  
file-loader  
html-webpack-plugin  
jquery  
less  
less-loader  
style-loader  
url-loader  
webpack  
webpack-dev-server  

<font color="orange">webpackDemo/src/index.html</font>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>webpackDemo</title>
</head>
<body>
  <div class="wrapper"></div>
</body>
</html>
```

<font color="orange">webpackDemo/src/css/reset.less</font>
```less
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
input, button {
  outline:none;
}
```

<font color="orange">webpackDemo/src/css/index.less</font>
```less
@import 'reset.less';
.wrapper {
  margin: 50px auto;
  border: 1px solid #000;
  width: 400px;
  height: 500px;
  background: lightpink;
}
```

<font color="orange">webpackDemo/src/index.js</font>
```javascript
import '../src/css/index.less';
import $ from 'jquery';
$('.wrapper').append('您好');
```

<font color="orange">webpackDemo/package.json</font>
```json
{
  "name": "webpackdemo",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
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

<font color="orange">webpackDemo/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js',
    vendor: [ "jquery" ]
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
        loader: ExtractTextPlugin.extract(['css-loader'])
      },
      {
        test: /\.less/, // less-loader
        loaders: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ])
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
      chunks: ['index', 'vendor'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // 对应entry的key
    })
  ]
}
```

运行 $ npm run start, 打开 http://localhost:8080/ ，效果如下：

![34](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208114004437-142817722.jpg)


下面写banner（输入框和发送按钮）部分，先写一个简单的js

新建 webpackDemo/src/js/banner.js

<font color="orange">webpackDemo/src/js/banner.js</font>
```javascript
export default function ($wrapper) {
  $wrapper.append('banner');
}
```

<font color="orange">webpackDemo/src/index.js</font>
```javascript
import '../src/css/index.less';
import $ from 'jquery';
import bannerRender from '../src/js/banner';

const $wrapper = $('.wrapper');

const init = () => {
  bannerRender($wrapper);
}

init();
```

效果如下：

![35](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208114026562-662583019.jpg)


下面写banner部分的html部分和css部分

安装依赖 $ npm i atpl-loader postcss-loader --save-dev

新建  
webpackDemo/src/tpl/banner.atpl  
webpackDemo/src/css/banner.less  
webpackDemo/postcss.config.js

<font color="orange">webpackDemo/postcss.config.js</font>
```javascript
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

<font color="orange">webpackDemo/webpack.config.js</font>
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // 入口文件地址
    index: './src/index.js',
    vendor: [ "jquery" ]
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
        test: /\.css$/, // css-loader postcss-loader
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
      },
      {
        test: /\.less/, // less-loader postcss-loader
        loaders: ExtractTextPlugin.extract('css-loader!less-loader!postcss-loader')
      },
      {
        test: /\.(png|jpg)$/, // img-loader
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      },
      {
        test: /\.atpl?$/, // atpl
        loader: 'atpl-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的的html文件名
      template: './src/index.html', // 被打包的html路径
      chunks: ['index', 'vendor'] // 需要引入的js，对应entry的key
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // 对应entry的key
    })
  ]
}
```

<font color="orange">webpackDemo/src/tpl/banner.atpl</font>
```html
<div class="banner-wrap">
  <input class="ipt" placeholder="在这里输入留言内容" />
  <button class="btn">发送</button>
</div>
```

<font color="orange">webpackDemo/src/css/banner.less</font>
```less
.banner-wrap {
  height: 50px;
  background: #fff;
  display: flex;
  .ipt {
    flex: 1;
    border: 0;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .btn {
    border: 0;
    width: 50px;
    border-radius: 0;
    color: #fff;
    font-size: 16px;
    background: #666;
  }
}
```

<font color="orange">webpackDemo/src/js/banner.js</font>
```javascript
import '../css/banner.less';
import bannerTpl from '../tpl/banner.atpl';

export default function ($wrapper) {
  $wrapper.append(bannerTpl({}));
}
```

运行 $ npm run start , 打开 http://localhost:8080/index.html , 效果如下

![36](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208114107906-2009993265.jpg)


下面写留言区域的部分

新建  
webpackDemo/src/tpl/message.atpl  
webpackDemo/src/css/message.less  
webpackDemo/src/js/message.js

<font color="orange">webpackDemo/src/tpl/message.atpl </font>
```html
<ul class="message-wrap">
  <li>大家好！大家好！大家好！大家好！大家好！大家好！大家好！大家好！大家好！大家好！大家好！大家好！</li>
  <li>留言6666666</li>
  <li>留言555555</li>
  <li>留言44444444</li>
  <li>留言3333333</li>
  <li>留言222222222</li>
  <li>留言11111111</li>
</ul>
```

<font color="orange">webpackDemo/src/css/message.less</font>
```less
.message-wrap {
  padding: 25px;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  li {
    border-bottom: 1px dashed lightcoral;
    padding: 10px 0;
    line-height: 1.5;
  }
}
```

<font color="orange">webpackDemo/src/js/message.js</font>
```javascript
import '../css/message.less';
import messageTpl from '../tpl/message.atpl';

export default function ($wrapper) {
  $wrapper.append(messageTpl({}));
}
```

<font color="orange">webpackDemo/src/index.js</font>
```javascript
import '../src/css/index.less';
import $ from 'jquery';
import bannerRender from '../src/js/banner';
import messageRender from '../src/js/message';

const $wrapper = $('.wrapper');

const init = () => {
  bannerRender($wrapper); // 引入banner部分
  messageRender($wrapper); // 引入message部分
}

init();
```

运行 $ npm run start , 打开 http://localhost:8080/index.html , 效果如下

![37](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208114139437-1823612829.jpg)


接下来写留言功能

<font color="orange">webpackDemo/src/js/banner.js</font>
```javascript
import '../css/banner.less';
import bannerTpl from '../tpl/banner.atpl';

// html
const render = ($wrapper) => {
    $wrapper.append(bannerTpl({}));
}

// 事件
const bindEvents = ($wrapper) => {
    // 点击发送按钮发送输入框内容
    $wrapper.on('click', '.btn', () => {
        const $ipt = $wrapper.find('.ipt');
        const $messageWrap = $wrapper.find('.message-wrap');
        const val = $ipt.val();
        // 当input有内容的时候才允许发送
        if ($ipt.length && val.length) {
            $messageWrap.prepend(`<li>${val}</li>`);
            // 发送完后清空input的val
            $ipt.val('');
        }
    })
}

export default function ($wrapper) {
    render($wrapper);
    bindEvents($wrapper);
}
```

运行 $ npm run start , 打开 http://localhost:8080/index.html，就能看到如下效果了

![38](http://images2017.cnblogs.com/blog/1009686/201712/1009686-20171208114156124-2098672525.gif)


