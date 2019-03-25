const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const proxy = require('koa-proxy');
const app = new Koa();
const port = 8080;

app.use(static(path.join(__dirname,'./dist')))
app.use(proxy({
    host:'http://192.168.2.178:7001'
}))
app.listen(port)