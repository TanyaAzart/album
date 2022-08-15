const express = require('express')
require('dotenv').config({
    path: '../../.env'
});
const cloudinary = require('cloudinary').v2;
const Album = require('../models/album')
const Comment = require('../models/comment')

// const path = require('node:path')
// const fs = require('node:fs/promises')

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

// Upload images to Cloudinary

router.post('/upload', async (req, res)=>{
    try {
        const albumId = req.body.albumId
        const pics = req.body.pics    

        const album = await Album.findOne({_id: albumId})

        const data = [...album.pics] 

        pics.forEach(pic => {
            data.push({
                name: pic.name,
                title: pic.title
            })
        })

        await pics.forEach( pic => {
            cloudinary.uploader.upload(pic.src,{
                folder: 'albums', 
                public_id: pic.name,
                tags: `${albumId}`
            }).then(result=> console.log(result.public_id))          
        })
    
        const updatedAlbum = await Album.findOneAndUpdate({_id: albumId}, { pics: data }, { new: true})

        res.send(updatedAlbum)

    } catch(err) {
        console.log(err)
    }
})

// Upload images to the public dir on server
// router.post('/upload', async (req,res)=> {
    
//     try {
//         const albumId = req.body.albumId
//         const pics = req.body.pics

//         const albumDir = path.join(__dirname,`../../client/build/images/${albumId}` )
        
//         await fs.mkdir(albumDir, { recursive: true })

//         const data = []       

//         const album = await Album.findById(albumId)

//         album.pics.forEach(pic=>{
//             data.push({ 
//                 name: pic.name,
//                 title: pic.title
//             })
//         })    
        
//         pics.forEach(pic => {
//             data.push({ 
//                 name: pic.name,
//                 title: pic.title
//             })
//         })
            
//         pics.forEach(async pic => {

//             const srcData = pic.src.replace(/^data:image\/\w+;base64,/, "");

//             const buf = Buffer.from(srcData, 'base64');

//             const file = path.join(albumDir,`/${pic.name}` )

//             await fs.writeFile(file, buf, (err)=> console.log(err));            
//         })

//         const updatedAlbum = await Album.findOneAndUpdate({_id: albumId}, { pics: data }, { new: true})

//         res.send(updatedAlbum)

//     } catch (err) {
//         res.status(400).send(err.message)
//     }    
// })

// Get picture
router.get('/albums/:name', async (req, res)=> {

    try {
        const picName = req.params.name
        
        const result = await cloudinary.uploader.explicit(`albums/${picName}`, {type: 'upload'})

        res.send(result.url)

    } catch (err) {
        console.log(err)
    }
})

// Delete picture
router.post('/upload/delete', async (req,res)=> {

        try {
            const albumId = req.body.id
            const picName = req.body.pic.name
            const picId = req.body.pic._id

            // const pathToFile = path.join(__dirname, `../../client/build/images/${albumId}/${picName}`)
        
            // await fs.unlink(pathToFile) 
            
            cloudinary.uploader.destroy(`albums/${picName}`)  
            
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
        // const albumDir = path.join(__dirname,`../../client/build/images/${req.params.id}` )

        // await fs.rm(albumDir, { force: true, recursive: true})

        await cloudinary.api.delete_resources_by_tag(`${req.params.id}`,
        function(error, result) {console.log(result, error); });

        await Album.findByIdAndDelete(req.params.id)

        await Comment.deleteMany({album: req.params.id})
        
        res.send()
        
    } catch (err) {
        res.status(500).send(err.message)
    }
})



module.exports = router
