import mongoose from 'mongoose'
const Grade = mongoose.model('Grade')

// 保存学生数据的方法
export const saveGrade = async (ctx, next) => {
  // 获取前端请求的数据
  const opts = ctx.request.body
  
  const grade = new Grade(opts)
  var validation = grade.validateSync()
  if (!validation) {
    const saveGrade = await grade.save() // 保存数据
    if (saveGrade) {
      ctx.body = {
        success: true,
        grade: saveGrade
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
export const fetchGrade = async (ctx, next) => {
  const grades = await Grade.find({})

  if (grades.length) {
    ctx.body = {
      success: true,
      grade: grades
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}
