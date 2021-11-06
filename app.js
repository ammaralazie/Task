const express=require('express')
const app =new express()
//here you can import any library and use it


const route=require('./route/wep')
app.use(route)
module.exports=app