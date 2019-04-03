import Koa from 'koa'
import KoaStatic from 'koa-static'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
// import fs from 'fs'
// import enforceHttps from 'koa-sslify'
// import https from 'https'
import config from './config'
import {database} from './mongodb'

database()

// const options = {
//    key: fs.readFileSync('./ssl/wu7.key'),  //ssl文件路径
//    cert: fs.readFileSync('./ssl/wu7.pem')  //ssl文件路径
// }
const GraphqlRouter = require('./router')

const app = new Koa()
const router = new Router()
const port = config.port || 4000

// app.use(enforceHttps()) 
app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

router.use('', GraphqlRouter.routes())

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(port);

console.log('ele server listen port: ' + port)
