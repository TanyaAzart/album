const express = require('express')
const multer = require('multer')
const sharp = require ('sharp')
const User = require('../models/user')
const Comment = require('../models/comment')
const auth = require ('../middleware/auth')

const router = new express.Router()

// Get users
router.get('/users', async (req, res )=> {
    
    try {
        const users = await User.find()
        res.status(200).send(users)
    
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Load user
router.get('/users/login', auth, async (req, res)=> {
    try {
        const user = req.user
        res.send(user)
    } catch(err) {
        res.status(400).send(err.message)
    }
})

// Register user
router.post('/users', async (req, res )=> {
    
    const user = new User (req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Delete user
router.post('/users/delete', auth, async (req,res)=> {
    const user = req.user
    try {        
        await User.deleteOne(user)
        await Comment.deleteMany({owner: user})
        res.send(user)

    } catch (err) {
        res.status(500).send(err.message)
    }
})

// Login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Logout user
router.post('/users/logout', auth, async (req,res)=> {
    const user = req.user
    try {
        user.tokens = user.tokens.filter(token => {
            return token.token !== req.token
        })
        await user.save()
        res.send()

    } catch (err) {
        res.status(500).send(err.message)
    }
})

const upload = multer ({ 
    limits: {
        fileSize: 1000000 // bites
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Please upload an image file"))
        }
        cb(undefined, true)
    }
})
router.post("/users/avatar", auth, upload.single("avatar"), async (req, res)=> {
    
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next)=> {
    res.status(400).send({error: error.message})
})

router.delete("/users/avatar", auth, async (req, res)=> {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


module.exports = router
