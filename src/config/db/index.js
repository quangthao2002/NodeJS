const mongoose = require('mongoose')

const connect = async () => {
  await mongoose
    .connect('mongodb://127.0.0.1/blog_db')
    .then(() => console.log('Connected to MongoDB success!!!'))
    .catch(() => console.log('Connect fail'))
}

module.exports = { connect }
