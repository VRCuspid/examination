const base = require('./webpack.base');
const merge = require('merge');
const htmlPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(base,{
    mode:'production',
    plugins: [
        new htmlPlugin({
            filename: 'index.html',
            inject: true,
            template: path.join(process.cwd(), 'src/index.html')
        }),
        new miniCss({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin()
    ],
    resolve:{
        alias:{
            '@': path.join(__dirname,'../src')
        }
    }
})