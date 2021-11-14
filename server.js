const app = require("./app");
const http = require("http");
const sokitIo = require("socket.io");
const server = http.createServer(app);
const chatController=require('./controller/chat.controller')
const io = sokitIo(server);
const users=[]
io.on('connection',socket=>{

  socket.on('rciv_msg',user=>{
    //here i save socket id for any online user
    users[user]=socket.id
  })
  socket.on('msg',async function(msg){

    if(msg.typing == false){
      io.to(users[msg.rcvId]).emit('rcvMsg',await chatController.createMsg(msg))
    }else{

      io.to(users[msg.rcvId]).emit('rcvMsg',{typing:true,check:true})
    }/* end of if */
    
    console.log('msg :',msg)
    
  })//end of listen to emit user_state


  // socket.on('racive_profile',async (data)=>{
  //   socket.emit('take_Messages',await chatController.getMessages(data.send_id,data.racive_id))
  // })//end of to emit racive_profile

})/* end of socket server */























// io.on("connection", (socket) => {
//   console.log("new client  " + socket.id + "  working ...");
//   socket.on("user_id", (user_id) => {

//     //iwill make the id sotred in database Indicates for the id camming from sockit
//     users[user_id] = socket.id;

//     //this section to send action this person is online
//     //emit here will send this user_id to everone make emit
//     io.emit("user_connect", user_id);

//     console.log("listen to frontend action");
//   }); //end of listen to emit user_id

//   socket.on('send-message',(data)=>{
//       socketId=users[data.rcv_id]

//       //this 'to' function take socketid to detrmaine racive user
//       io.to(socketId).emit('racive-message',data)
//       console.log(data)
//   }) 

// }); //end of connect to socketIo

server.listen(3000);
