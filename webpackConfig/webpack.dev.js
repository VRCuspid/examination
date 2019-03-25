const base = require('./webpack.base');
const merge = require('merge');
const path = require('path');
const htmPlugin = require('html-webpack-plugin');
module.exports = merge(base,{
    mode:'development',
    devServer:{
        host:'localhost',
        port:4399,
        proxy: {
            
            "/user/login": "http://localhost:7001",
            "/student/login": "http://localhost:7001",
            "/exam/exam": "http://localhost:7001",
            "/exam/exam/w5tcy-g2dts": "http://localhost:7001",
            "/": {
                target: "http://localhost:7001",
              }
          }
    },
    devtool: '#eval-source-map',
    plugins:[
        new htmPlugin({
            filename:'index.html',
            inject: true,
            template: path.join(process.cwd(),'./src/index.html')
        })
    ],
    resolve:{
        alias:{
            '@': path.join(__dirname,'../src')
        }
    }
})