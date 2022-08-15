const mongoose = require("mongoose")


// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true
// }) 

mongoose.connect("mongodb+srv://tazarchenko:Gagarin2019@cluster0.r2uon.mongodb.net/album?retryWrites=true&w=majority", {
    useNewUrlParser: true
}) 

