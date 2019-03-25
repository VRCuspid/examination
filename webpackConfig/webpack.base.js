const miniCss = require('mini-css-extract-plugin');
const path = require('path');

const env = process.env.NODE_ENV === 'production';
module.exports = {
    entry:{
        app: path.join(process.cwd(),'src/app.js')
    },
    output:{
        filename: 'build[hash:5].js',
        path: path.resolve(process.cwd(),'dist')
    },
    module:{
        rules:[
            {
                test:/\.js/,use:['babel-loader']
            },
            {
                test:/\.css$/,use:[env ? miniCss.loader : 'style-loader','css-loader']
            }
        ]
    }
}