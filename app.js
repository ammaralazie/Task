const express=require('express')
const app =new express()


//import express session and flash
const session = require('express-session')
const flash = require('connect-flash');
const bodyParser=require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAag: 60000 * 60 },
    })
  );
  app.use(flash());

//here you can import any library and use it
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const route=require('./route/wep')
app.use(route)
module.exports=app