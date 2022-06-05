const { Router } = require('express');
const router = Router();
const Cursos = require('./Cursos.js')
const usuarios = require('./Usuarios.js')
const Auth = require('./Auth.js')


router.use('/cursos', Cursos)
router.use('/usuarios', usuarios)
router.use('/auth', Auth)



module.exports = router
