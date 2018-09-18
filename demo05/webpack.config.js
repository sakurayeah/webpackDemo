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