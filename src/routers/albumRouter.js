const express = require('express')
const Album = require('../models/album')
const Comment = require('../models/comment')
const auth = require ('../middleware/auth')
const path = require('node:path')
const fs = require('node:fs/promises')

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

// Edit album
router.post('/albums/:id', async (req, res)=> {

    try {
        const album = await Album.findOneAndUpdate({_id: req.params.id}, req.body, { new: true})

        res.send(album)
    } catch (err) {
        res.status(400).send(err.message)
    }    
})

// Upload images
router.post('/upload', async (req,res)=> {
    
    try {
        const albumId = req.body.albumId
        const pics = req.body.pics

        const albumDir = path.join(__dirname,`../../client/public/images/${albumId}` )
        
        await fs.mkdir(albumDir, { recursive: true })

        const data = []       

        const album = await Album.findById(albumId)

        album.pics.forEach(pic=>{
            data.push({ 
                name: pic.name,
                title: pic.title
            })
        })    
        
        pics.forEach(pic => {
            data.push({ 
                name: pic.name,
                title: pic.title
            })
        })
            
        pics.forEach(async pic => {

            const srcData = pic.src.replace(/^data:image\/\w+;base64,/, "");

            const buf = Buffer.from(srcData, 'base64');

            const file = path.join(albumDir,`/${pic.name}` )

            await fs.writeFile(file, buf, (err)=> console.log(err));            
        })

        const updatedAlbum = await Album.findOneAndUpdate({_id: albumId}, { pics: data }, { new: true})

        res.send(updatedAlbum)

    } catch (err) {
        res.status(400).send(err.message)
    }    
})

// Delete image
router.post('/upload/delete', async (req,res)=> {

        try {
            const albumId = req.body.id
            const picName = req.body.pic.name
            const picId = req.body.pic._id

            const pathToFile = path.join(__dirname, `../../client/public/images/${albumId}/${picName}`)
            
            await fs.unlink(pathToFile)   
            
            await Comment.deleteMany({album: albumId, pic: picId})

            const album = await Album.findOne({_id: albumId})

            const updatedPics = album.pics.filter(pic=>pic.name !==picName)

            album.pics = updatedPics

            await album.save()

            res.send(album)
    
        } catch (err) {
            res.status(400).send(err.message)
        } 
})
    

// Delete album
router.post('/albums/delete/:id', async (req,res)=> {
    
    try {     
        const albumDir = path.join(__dirname,`../../client/public/images/${req.params.id}` )

        await fs.rm(albumDir, { force: true, recursive: true})

        await Album.findByIdAndDelete(req.params.id)

        await Comment.deleteMany({album: req.params.id})
        
        res.send()
        
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router
