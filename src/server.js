const express = require('express')
// const path = require('path')
const cors = require('cors')

// require('./db/mongoose')

// const albumRouter = require('./routers/albumRouter')
// const userRouter = require('./routers/userRouter')

const server = express()
const port = process.env.PORT || 4000

const corsOptions ={
    credentials: true
}

server.use(cors())


server.use(express.json())
// server.use(contactRouter)
// server.use(userRouter)

// if (process.env.NODE_ENV ==='production') {
//     server.use(express.static('client/build'))

//     server.get('*', (req, res)=>{
//         res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
//     })
// }


server.listen(port, ()=>{
    console.log('Server is running on port ', port)
})

