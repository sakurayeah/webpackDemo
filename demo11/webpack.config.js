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