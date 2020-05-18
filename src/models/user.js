var mongoose = require('mongoose');
var User = mongoose.Schema({
    datosPersonales: {
        nombreCompleto: String,
        numeroIdentidad: String,
        celular: Number,
        correo: String,
        validateCorreo: String,
        password: String,
        validatePassword: String
    },
    datosResidencia: {
        departamento: String,
        ciudad: String,
        barrio: String,
        direccionResidencia: String
    },
    datosFinancieros: {
        salario: Number,
        otrosIngresos: Number,
        gastosMensuales: Number,
        gastosFinacieros: Number
    }
});

module.exports = mongoose.model('User', User);