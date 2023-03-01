const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    const payload = {uid, name};

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.secretJWT,{
            expiresIn: '24h'
        },(err,token) => {
            if(err) {
                console.error(err);
                reject(err);
            }else{
                resolve(token);
            }
        });
    })
}

module.exports = generateJWT;