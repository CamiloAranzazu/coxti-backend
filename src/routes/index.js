const { Router } = require('express');
const router = Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('HELLO'));

router.post('/registrar', verifyToken, async(req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.send('REGISTRADO!');
});

router.post('/iniciar', async(req, res) => {
    const { correo, password } = req.body;
    const user = await User.findOne({ "datosPersonales.correo": correo });
    console.log(user.datosPersonales.password);
    if (!user) return res.status(401).send("errorCorreo");
    if (user.datosPersonales.password !== password) return res.status(401).send("errorPassword");

    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token });
});

router.get('/users-private', verifyToken, async(req, res, next) => {
    const users = await User.find();
    return res.json(users);
});


module.exports = router;

// 
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('NOTAUTHORIZATION');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('NOTAUTHORIZATION');
    }

    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id;
    next();
}