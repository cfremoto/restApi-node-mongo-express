const usuarios = require('../Models/model.Usuario.js')
const Validate = require('../helpers/Validate.js')
const bcrypt = require('bcrypt')

const getUsuarios = async (req, res) => {
    try {
        const user = await usuarios.find({ estado: true })
        res.send(user)
    } catch (err) {
        res.status(404).send({
            info: 'Error al obtener los usuarios',
            err
        })
    }
}

const getUsuarioEmail = async (req, res) => {
    try {
        const user = await usuarios.findOne({ email: req.params.email })
        res.send(user)
    } catch (err) {
        res.status(500).send({
            message: 'Error al obtener usuario',
            err
        })
    }
}

const createUsuario = async (req, res) => {

    try {
        const { email, nombre, password } = req.body
        const valido = await Validate.schema.validate({ email, nombre, password })
        if (valido.error) {
            res.status(400).send({
                info: 'Error al crear usuario',
                error: valido.error.details[0].message
            })
        } else {
            const usuario = new usuarios({ email, nombre, password: bcrypt.hashSync(password, 10), })
            await usuario.save()
            res.send({
                message: 'Usuario creado exitosamente',
                data: usuario
            })
        }
    } catch (err) {
            res.status(500).send({
                message: `Error al crear el usuario ${err}`
            })
        }

}

const updateOrDeleteUsuario = async (req, res) => {
    try {
        if (req.body.nombre && req.body.password) {
            const usuario = await usuarios.findOneAndUpdate({ email: req.params.email }, {
                $set: {
                    nombre: req.body.nombre,
                    password: req.body.password,
                }
            }, { new: true })
            res.send({
                message: 'Usuario Actualizado Exitosamente',
                usuario
            })

        } else {
            // si quieres eliminar, yo lo manejare desactivando users
            // await usuarios.findByIdAndDelete(email)
            // res.send({
            //     message: 'Usuario eliminado exitosamente'
            // })
            const data = await usuarios.findOneAndUpdate({ email: req.params.email }, {
                $set: { estado: false }
            }, { new: true })
            res.send({ info: 'Usuario eliminado exitosamente', data })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: 'Error al actualizar Usuario',
            err
        })
    }
}


module.exports = {
    getUsuarios,
    createUsuario,
    updateOrDeleteUsuario,
    getUsuarioEmail,
}
