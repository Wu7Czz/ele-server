import mongoose from 'mongoose'
const GradeModel = mongoose.model('Grade')
const ClassModel = mongoose.model('Class')

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
      ctx.throw(500, '保存失败！')
    }
  } else {
    ctx.throw(403, validation.message)
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
    ctx.throw(500, '查询失败！')
  }
}
// 删除指定年级
export const deleteGrade = async (ctx, next) => {
  const id = ctx.query ? ctx.query.id : ''
  if (!id) {
    ctx.throw(403, '未传入年级id！')
  }
  const c = await ClassModel.findOne({'gradeId': id})
  if (c) {
    ctx.throw(403, '不能删除有班级的年级！')
  }
  const g = await GradeModel.deleteOne({'_id' : id})
  if (g) {
    ctx.body = {
      success: true,
      data: g
    }
  } else {
    ctx.throw(500, '删除失败！')
  }
}
