const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const dbConnection = async() => {

    try{
        await mongoose.connect(process.env.db);
        console.log('DB conecction')
    }catch(e){
        console.log(e);
        throw new Error('Error conecction');
    }

}

module.exports = dbConnection;