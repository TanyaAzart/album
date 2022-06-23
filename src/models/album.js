const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    year: {
        type: String,
        trim: true,
        required: true
    },
    descr: {
        type: String,
        trim: true
    },
    pics: {
        type: [{
            name: String,
            title: String
        }]
    }
    
 }, { timestamps: true })

//  albumSchema.virtual("pictures", {
//     ref: "Picture",
//     localField: "_id",
//     foreignField: "owner"
// })


const Album = mongoose.model("Album", albumSchema)

module.exports = Album