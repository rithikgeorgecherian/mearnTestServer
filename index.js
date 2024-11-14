require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./database/dbConnection')

const mearnTestServer = express()   //calling express server

mearnTestServer.use(cors())
mearnTestServer.use(express.json())
mearnTestServer.use(router)   //router should be used at last after cors and parse

const PORT = 3003 || process.env.PORT

mearnTestServer.listen(PORT, ()=>{
    console.log(`mearnTestServer started at port ${PORT} and waiting for client request!!!`);
})

mearnTestServer.get('/', (req, res)=>{
    res.status(200).send(`<h1 style="color:red;">mearnTestServer started at port and waiting for client request!!!<h1/>`)
})

