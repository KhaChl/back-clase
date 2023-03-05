const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: 'N/A'
    },
    status:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Users', userSchema);