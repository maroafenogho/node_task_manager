const mongoose = require('mongoose')


const connectDB = (url) => {
    return mongoose.connect(url).catch((err) => console.log(err))
}


module.exports = connectDB
//mongodb+srv://maroafenogho:<password>@codewithmaro.632zcud.mongodb.net/?retryWrites=true&w=majority