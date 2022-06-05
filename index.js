require('dotenv').config()
const express = require('express')
const app = express()

const router = require('./routes/index.js')
require('./DB/index.js')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)




const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
