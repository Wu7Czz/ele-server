import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const StudentSchema = new Schema({
  _id: ObjectId,
  name: { 
    type: String,
    match: [/[\u4e00-\u9fa5]/, '名字必须为中文'],
    // validate: {
    //   validator: function(data) {
    //     return /[\u4e00-\u9fa5]/.test(data);
    //   },
    //   message: '名字必须为中文' 
    // },
    required: [true, '名字是必须的'],
    maxlength: [4, '名字应不大于四个字'],
    minlength: [2, '名字应不小于两个字'],
    index: true
  },
  sex: { 
    type: String,
    enum: ['男', '女'],
    default: '男'
  },
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
})

StudentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Student', StudentSchema)