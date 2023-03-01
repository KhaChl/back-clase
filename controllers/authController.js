const { validationResult } = require("express-validator");
const Users = require("../models/user");
const bcrypt = require("bcryptjs");
const generateJWT = require("../helper/jwt");

const createUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, message: errors.mapped() });
    }

    const { name, email, password } = req.body;

    try {
        const user = await Users.findOne({ email: email });

        if (user) {
            return res.status(400).json({ ok: false, message: 'email already registered' })
        }

        const userCreated = new Users(req.body);

        const salt = bcrypt.genSaltSync();
        userCreated.password = bcrypt.hashSync(password, salt);

        const token = await generateJWT(userCreated._id, name);

        await userCreated.save();

        return res.status(200).json({ ok: true, message: 'user created', uid: userCreated._id, name: name, token })


    } catch (err) {
        return res.status(500).json({ ok: false, message: err })
    }

};

const login = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, message: errors.mapped() });
    }

    const { email, password } = req.body;

    try {

        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ ok: false, message: 'email not exist' })
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ ok: false, message: 'error password' })
        }

        const token = await generateJWT(user._id, user.name);

        return res.status(200).json({ ok: true, message: 'user correct', uid: user._id, name: user.name, token })

    } catch (err) {
        return res.status(500).json({ ok: false, message: err })
    }

};

const reValidateToker = async (req, res) => {

    const { uid, name } = req;

    const token = await generateJWT(uid, name);

    return res.status(200).json({ ok: true, uid, name, token })

};

module.exports = {
    createUser,
    login,
    reValidateToker
}