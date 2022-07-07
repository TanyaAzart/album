const mongoose = require("mongoose")

const commentSchema = mongoose.Schema ({
    text: {
        type: String,
        required:true
    },
    pic: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Album"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment