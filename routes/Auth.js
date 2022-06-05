const { Router } = require('express')
const router = Router()
const { getAuth } = require('../controllers/controllerAuth.js')

router.post('/', getAuth)

module.exports = router
