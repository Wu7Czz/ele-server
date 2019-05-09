import mongoose from 'mongoose'
const GradeModel = mongoose.model('Grade')

// 保存学生数据的方法
export const saveGrade = async (ctx, next) => {
  // 获取前端请求的数据
  const opts = ctx.request.body
  
  const grade = new GradeModel(opts)
  var validation = grade.validateSync()
  if (!validation) {
    const saveGrade = await grade.save() // 保存数据
    if (saveGrade) {
      ctx.body = {
        success: true,
        data: saveGrade
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

// 查询所有年级的数据
export const fetchGrade = async (ctx, next) => {
  const grades = await GradeModel.find({})

  if (grades.length) {
    ctx.body = {
      success: true,
      data: grades
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}
// 删除指定年级
export const deleteGrade = async (ctx, next) => {
  const id = ctx.query ? ctx.query.id : ''
  if (!id) {
    return fasle
  }
  const p = await GradeModel.deleteOne({'_id' : id})
  if (p) {
    ctx.body = {
      success: true,
      data: p
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}
