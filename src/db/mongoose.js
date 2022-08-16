const mongoose = require("mongoose")


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
}) 

mongoose.connection.on('connected', ()=> {
    console.log('Mongoose is connected!')
})

