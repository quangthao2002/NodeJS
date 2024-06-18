const Course = require('../models/Course')
class MeController {
  index(req, res, next) {
    Promise.all([
      Course.find({}).sortStable(req),
      Course.countDocumentsWithDeleted({ deleted: true }),
    ])
      .then(([courses, countDeleted]) => {
        courses = courses.map((course) => course.toObject())
        res.render('me/stored-courses', { courses, countDeleted })
      })
      .catch(next)
  }
  trashCourses(req, res) {
    Course.findDeleted({})
      .then((courses) => {
        courses = courses.map((course) => course.toObject())
        res.render('me/trash-courses', { courses })
      })
      .catch(() => {
        res.render('me/trash-courses')
      })
  }
}
module.exports = new MeController()
