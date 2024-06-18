const moment = require('moment')
const Handlebars = require('handlebars')
module.exports = {
  sum: (a, b) => {
    return a + b
  },
  formatDate: (date, format) => {
    return moment(date).format(format)
  },
  sortable: (field, sort) => {
    const sortType = field === sort.column ? sort.type : 'default'
    const icons = {
      default: 'fas fa-sort',
      asc: 'fa-solid fa-arrow-up-wide-short',
      desc: 'fa-solid fa-arrow-down-short-wide',
    }
    const types = {
      default: 'desc',
      asc: 'desc',
      desc: 'asc',
    }
    const icon = icons[sortType] || icons.default
    const type = types[sortType] || types.default
    const href = Handlebars.escapeExpression(
      `?_sort&column=${field}&type=${type}`
    )

    const result = ` <a href="${href}">
          <i class="${icon}"></i>
        </a>`

    return new Handlebars.SafeString(result)
  },
}
