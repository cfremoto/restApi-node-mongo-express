const bcrypt = require('bcrypt')
const Usuarios = require('../Models/model.Usuario.js')

const getAuth = async (req, res) => {
    try {
        const { email, password } = req.body
        const usuario = await Usuarios.findOne({ "email": email })
        if (usuario) {
            if (bcrypt.compareSync(password, usuario.password)) {
                res.send({info: 'Usuario Autenticado', usuario})
            } else {
                res.status(400).send({info: 'Usuario o contraseña Invalida!!!'})
            }
        }
    } catch (err) {
        res.send({info: 'Error en servicio', err})
    }

}

module.exports = {
    getAuth,
}
