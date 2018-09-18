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