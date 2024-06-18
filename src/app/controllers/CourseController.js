const Course = require('../models/Course')
class CourseController {
  show(req, res, next) {
    const slug = req.params.slug
    Course.findOne({ slug: slug })
      .then((course) => {
        course = course.toObject()
        res.render('courses/show', { course })
      })
      .catch(next)
  }
  index(req, res, next) {
    res.send('Courses')
  }
  create(req, res, next) {
    res.render('courses/create')
  }
  async store(req, res, next) {
    const formData = req.body
    formData.image = `https://img.youtube.com/vi/${formData.videoId}/maxresdefault.jpg`
    const course = new Course(formData)
    await course
      .save()
      .then(() => {
        res.redirect('/me/stored/courses')
      })
      .catch(() => {
        console.log('Fail create course')
        res.status(500).send('There was an error creating the course')
      })
  }
  edit(req, res, next) {
    const id = req.params.id
    Course.findById(id)
      .then((course) => {
        course = course.toObject()
        res.render('courses/edit', { course })
      })
      .catch(next)
  }

  async update(req, res, next) {
    const id = req.params.id
    const formData = req.body
    formData.image = `https://img.youtube.com/vi/${formData.videoId}/maxresdefault.jpg`
    Course.updateOne({ _id: id }, formData)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => {
        res.redirect('back')
      })
      .catch(next)
  }

  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => {
        res.redirect('back')
      })
      .catch(next)
  }

  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('back')
      })
      .catch(next)
  }

  handleFormAction(req, res, next) {
    console.log(req.body.courseIds)
    switch (req.body.action) {
      case 'Delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => {
            res.redirect('back')
          })
          .catch(next)
        break
      default:
        res.json({ message: 'Action is invalid' })
    }
  }
}
module.exports = new CourseController()
