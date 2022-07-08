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

 albumSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "album"
})

// albumSchema.pre("remove", async function (next) {
//     const album = this
//     await Comment.deleteMany({ album })
//     next()
// })


const Album = mongoose.model("Album", albumSchema)

module.exports = Album