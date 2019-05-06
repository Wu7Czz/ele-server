import mongoose from 'mongoose'
import {handleError} from '../utils/index.js'
const ClassModel = mongoose.model('Class')

// 保存学生数据的方法
export const saveClass = async (ctx, next) => {
  // 获取前端请求的数据
  const opts = ctx.request.body
  const _class = new ClassModel(opts)
  var validation = _class.validateSync()
  if (!validation) {
    const saveClass = await _class.save() // 保存数据
    if (saveClass) {
      ctx.body = {
        success: true,
        class: saveClass
      }
    } else {
      ctx.body = {
        success: false
      }
    }
  } else {
    handleError(ctx, validation.message)
  }
}

// 查询所有学生的数据
export const fetchClass = async (ctx, next) => {
  const _classes = await ClassModel.find({})

  if (_classes.length) {
    ctx.body = {
      success: true,
      class: _classes
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}
