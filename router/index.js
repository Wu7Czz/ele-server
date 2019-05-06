
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import {saveClass, fetchClass} from '../controllers/class'
import {saveGrade, fetchGrade} from '../controllers/grade'
import {saveStudent, fetchStudent, fetchStudentDetail} from '../controllers/student'

// 引入schema
import schema from '../graphql/schema'

const router = require('koa-router')()

router.post('/saveclass', saveClass)
      .get('/fetchclass', fetchClass)
      .post('/savegrade', saveGrade)
      .get('/fetchgrade', fetchGrade)
      .post('/savestudent', saveStudent)
      .get('/student', fetchStudent)
      .get('/studentDetail', fetchStudentDetail)

router.post('/graphql', async (ctx, next) => {
        await graphqlKoa({schema: schema})(ctx, next) // 使用schema
      })
      .get('/graphql', async (ctx, next) => {
        await graphqlKoa({schema: schema})(ctx, next) // 使用schema
      })
      .get('/graphiql', async (ctx, next) => {
        await graphiqlKoa({endpointURL: '/graphql'})(ctx, next) // 重定向到graphiql路由
      })
module.exports = router
