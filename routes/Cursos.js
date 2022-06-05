const { Router } = require('express')
const router = Router()
const { getCursos, createCursos, updateOrDeleteCursos, getCursoId } = require('../controllers/controllerCursos.js')

router.get('/', getCursos)
router.get('/:id', getCursoId)
router.post('/', createCursos)
router.put('/:id', updateOrDeleteCursos)


module.exports = router
