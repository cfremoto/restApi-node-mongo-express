const Cursos = require('../Models/model.Cursos.js')
const {cursoSchema} = require('../helpers/Validate.js')

const getCursos = async (req, res) => {
    try {
        const cursos = await Cursos.find({ estado: true })
        res.send({info: 'Cursos obtenidos correctamente', cursos})
    } catch (err) {
        res.status(400).send({ message: 'Error al obtener los cursos', err })
    }
}

const createCursos = async (req, res) => {
    const { titulo, descripcion } = req.body
    try {
        const valido = await cursoSchema.validate({ titulo, descripcion })
        if (valido.error) {
            res.status(400).send({
                message: valido.error.details[0].message,
            })
        } else {
            const curso = new Cursos({ titulo, descripcion })
            await curso.save()
            res.send({info: 'Curso creado Exitosamente', curso})
        }
    } catch (error) {
        res.status(400).send({
            message: 'Error al crear el curso',
            error
        })
    }
}

const updateOrDeleteCursos = async (req, res) => {
    const { id } = req.params
    const { titulo, descripcion } = req.body
    try {
        if (titulo && descripcion) {
            const curso = await Cursos.findByIdAndUpdate({ "id": id }, { $set: { titulo, descripcion } }, {new: true})
            res.send({info: 'Curso actualizado', curso})
        } else {
            const curso = await Cursos.findByIdAndUpdate({ "id": id }, { $set: { estado: false } }, { new: true })
            res.send({info: 'Curso eliminado', curso})
        }
    } catch (error) {
        res.status(400).send({
            message: 'Error al actualizar el curso',
            error
        })
    }
}

const getCursoId = async (req, res) => {
    const { id } = req.params
    try {
        const curso = await Cursos.findById({ "id": id })
        res.send({ info: 'Curso obtenido Correctamente', curso })
    } catch (err) {
        res.status(400).send({ message: 'Error al obtener el curso', err })
    }
}

module.exports = {
    getCursos,
    createCursos,
    updateOrDeleteCursos,
    getCursoId
}
