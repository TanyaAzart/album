const express = require('express')
const mongoose = require('mongoose')
const Comment = require('../models/comment')
const auth = require ('../middleware/auth')
const path = require('node:path')
const fs = require('node:fs/promises')

const router = new express.Router()

// Get comments
router.get('/comments/:id', async (req, res )=> {

    const albumId = req.params.id
    
    try {
        const comments = await Comment.find({ album: mongoose.Types.ObjectId(albumId)})
        res.status(200).send(comments)
    
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Add comment
router.post('/comments', async (req, res )=> { 
    try {
        let comment = {
            text: req.body.text,
            pic: mongoose.Types.ObjectId(req.body.pic),
            album: mongoose.Types.ObjectId(req.body.album),
            owner: mongoose.Types.ObjectId(req.body.owner)
        }
        
        comment = new Comment (comment)
        await comment.save()
        
        res.status(201).send(comment)
    
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Edit comment
router.post('/comments/:id', async (req, res)=> {
    try {
        const comment = await Comment.findOneAndUpdate({_id: req.params.id}, req.body, { new: true})
        res.send(comment)
    } catch (err) {
        res.status(400).send(err.message)
    }     
})


// Delete comment
router.post('/comments/delete/:id', async (req,res)=> {
    
    try { 
        const comment = await Comment.findByIdAndDelete(req.params.id)
        
        res.send(comment)
        
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router
