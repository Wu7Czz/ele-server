// 引入mongoose
import mongoose from 'mongoose'

// 
const Schema = mongoose.Schema

// 实例InfoSchema
const InfoSchema = new Schema({
  hobby: [String],
  height: {
    type: String,
    required: [true, 'height为必要字段']
  },
  weight: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
}, { 
  versionKey: false // 不需要 __v 字段，默认是加上的
})
// 在保存数据之前跟新日期
InfoSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})
// 建立Info数据模型
mongoose.model('Info', InfoSchema)