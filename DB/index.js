const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://localhost:27017/db_user_cursos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a Mongodb'))
    .catch(err => console.log(err))

module.exports = db
