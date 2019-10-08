const express = require('express');
const accountsRouter = require('./routes/accountsRouter')

const server = express();
server.use(express.json())




server.use('/accounts', accountsRouter)

server.get('/',(req,res)=>{
    res.send('<h1>I work</h1>')
})
module.exports= server