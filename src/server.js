const express = require('express')
const path = require('path')
const cors = require('cors')

require('./db/mongoose')

const albumRouter = require('./routers/albumRouter')
const userRouter = require('./routers/userRouter')
const commentRouter = require('./routers/commentRouter')

const server = express()
const port = process.env.PORT 

const corsOptions ={
    credentials: true
}

server.use(cors())

server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb'}));

server.use(albumRouter)
server.use(userRouter)
server.use(commentRouter)

server.use(express.static('client/public'))

if (process.env.NODE_ENV ==='production') {
    server.use(express.static('client/build'))

    server.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname + '/../client/build/index.html'))
    })
}


server.listen(port, ()=>{
    console.log('Server is running on port ', port)
})

