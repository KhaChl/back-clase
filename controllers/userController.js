const Users = require("../models/user");


const listUser = async (req, res) => {

    try {
        const user = await Users.find().select({ "_id": 1, "name": 2, 'email': 3, country: 4, status: 5 });
        return res.status(200).json({ ok: true, data: user })
    } catch (error) {
        return res.status(500).json({ ok: false, message: error })
    }

};

const updateUser = async (req, res) => {

    try {
        let dataUpdate = req.body;
        let filter = {
            _id: req.body._id
        };

        if(req.body._id == undefined){
            return res.status(400).json({ ok: false, message: "Error id not found"})
        }
        await Users.findOneAndUpdate(filter, dataUpdate);

        return res.status(200).json({ ok: true, message: 'User update'})
    } catch (error) {
        return res.status(500).json({ ok: false, message: error })
    }

};

const deleteUser = async (req, res) => {

    try {

        if(req.body._id == undefined){
            return res.status(400).json({ ok: false, message: "Error id not found"})
        }

        await Users.deleteOne({_id: req.body._id});

        return res.status(200).json({ ok: true})
    } catch (error) {
        return res.status(500).json({ ok: false, message: error })
    }

};

module.exports = {
    listUser,
    updateUser,
    deleteUser
}