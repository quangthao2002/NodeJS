const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const slugify = require('slugify')
const mongooseDelete = require('mongoose-delete')
const slug = require('mongoose-slug-updater')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const courseSchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    videoId: String,
    slug: { type: String, slug: 'name', unique: true },
  },
  { timestamps: true, _id: false }
)
mongoose.plugin(slug)
courseSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })
courseSchema.plugin(AutoIncrement)

courseSchema.query.sortStable = function (req) {
  const isValidType = ['desc', 'asc'].includes(req.query.type)
  if (req.query.hasOwnProperty('_sort')) {
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : 'desc',
    })
  }
  return this
}

module.exports = mongoose.model('Courses', courseSchema)
