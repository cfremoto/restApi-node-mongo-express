const { Router } = require('express')
const router = Router()
const { getUsuarios, createUsuario,getUsuarioEmail, updateOrDeleteUsuario} = require('../controllers/controllerUsuarios.js')


router.get('/', getUsuarios)
router.get('/:email', getUsuarioEmail)
router.post('/', createUsuario)
router.put('/:email', updateOrDeleteUsuario)


module.exports = router
