// 引入mongoose模块
import mongoose from 'mongoose'
import config from '../config'

// 同步引入 info model和 studen model
require('./schema/class')
require('./schema/grade')
require('./schema/student')
const connect = {
  useNewUrlParser: true,
  config: {
    autoIndex: false
  }
}
// 链接mongodb
export const database = () => {
  mongoose.set('debug', true)

  mongoose.connect(config.dbPath, connect)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.dbPath)
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB ', config.dbPath)
  })
}
