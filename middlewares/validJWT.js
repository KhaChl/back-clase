const jwt = require('jsonwebtoken');

const validJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ ok: false, message: 'error, not exist token' })
    }

    try {
        const { uid, name} = jwt.verify(token, process.env.secretJWT);
        req.uid =  uid;
        req.name = name;
    } catch (err) {
        return res.status(401).json({ ok: false, message: 'error, not valid token' })
    }

    next();
}

module.exports = validJWT;