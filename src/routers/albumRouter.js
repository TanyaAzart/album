const express = require('express')
const Album = require('../models/album')
const auth = require ('../middleware/auth')

const router = new express.Router()

// Get albums
router.get('/albums', async (req, res )=> {
    
    try {
        const albums = await Album.find()
        res.status(200).send(albums)
    
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// Add album
router.post('/albums', async (req, res )=> {
    
    const album = new Album (req.body)
    
    try {
        await album.save()
        res.status(201).send(album)
    
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// // Get album

// router.get('/albums/:id', async(req, res)=> {
//     const album = await Album.findById(req.params.id)
//     res.send(album)
// })

// Edit album
router.post('/albums/:id', async (req, res)=> {

    const album = await Album.findByIdAndUpdate(req.params.id, req.body)

    res.send(album)
})

// Delete album
router.post('/albums/delete/:id', auth, async (req,res)=> {    
    const user = req.user
    
    try { 
        if (user.name==='admin'){
            await Album.findByIdAndDelete(req.params.id)
            res.send()
        } 
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// // Login user
// router.post('/users/login', async (req, res) => {
//     try {
//         const user = await User.findByCredentials(req.body.email, req.body.password)
//         const token = await user.generateAuthToken()
//         res.send({user, token})
    
//     } catch (err) {
//         res.status(400).send(err.message)
//     }
// })

// // Logout user
// router.post('/users/logout', auth, async (req,res)=> {
//     const user = req.user
//     try {
//         user.tokens = user.tokens.filter(token => {
//             return token.token !== req.token
//         })
//         await user.save()
//         res.send()

//     } catch (err) {
//         res.status(500).send(err.message)
//     }
// })

module.exports = router
