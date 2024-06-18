const Course = require('../models/Course')

class SiteController {
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        courses = courses.map((course) => course.toObject())
        res.render('home', { courses })
      })
      .catch(next)
  }

  search(req, res) {
    console.log(req.body)
  }
  getSearch(req, res) {
    res.render('search')
  }
}
module.exports = new SiteController()
