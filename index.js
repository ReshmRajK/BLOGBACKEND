const express=require('express')
require('dotenv').config()
const cors=require('cors')
require('./Connection/db_connection')
const route=require('./Routes/routing')

const server=express()

server.use('/uploads',express.static('./uploads'))

server.use(express.json())
server.use(cors())
server.use(route)

const port=4000 || process.env.port

server.listen(port,()=>{
    console.log(`server runs at port number ${port}`);
})