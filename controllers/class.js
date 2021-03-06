import mongoose from 'mongoose'
const ClassModel = mongoose.model('Class')

// 保存班级数据的方法
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
        data: saveClass
      }
    } else {
      ctx.throw(500, '保存失败！')
    }
  } else {
    ctx.throw(403, validation.message)
  }
}

// 查询所有班级的数据
export const fetchClass = async (ctx, next) => {
  const _classes = await ClassModel.find({})

  if (_classes.length) {
    ctx.body = {
      success: true,
      data: _classes
    }
  } else {
    ctx.throw(500, '查询失败！')
  }
}
// 删除指定年级
export const deleteClass = async (ctx, next) => {
  const id = ctx.query ? ctx.query.id : ''
  if (!id) {
    ctx.throw(403, '查询失败！')
  }
  const p = await ClassModel.deleteOne({'_id' : id})
  if (p) {
    ctx.body = {
      success: true,
      data: p
    }
  } else {
    ctx.throw(500, '删除失败！')
  }
}
