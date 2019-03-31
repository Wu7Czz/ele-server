import Koa from 'koa'
import KoaStatic from 'koa-static'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import config from './config'
import {database} from './mongodb'

database()

const GraphqlRouter = require('./router')

const app = new Koa()
const router = new Router()

const port = config.port || 4000

app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

router.use('', GraphqlRouter.routes())

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(port);
console.log('ele server listen port: ' + port)
