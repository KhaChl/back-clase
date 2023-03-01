const Users = require("../models/user");


const listUser = async (req, res) => {

    try {
        const user = await Users.find().select({ "_id": 1, "name": 2, 'email': 3 });
        return res.status(200).json({ ok: true, data: user })
    } catch (error) {
        return res.status(500).json({ ok: false, message: error })
    }

};

module.exports = {
    listUser
}