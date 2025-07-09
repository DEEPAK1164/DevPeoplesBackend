
const socket=require("socket.io");

const initializeSocket=(server)=>{
    
const io=socket(server,{
  cors:{
    origin:"http://localhost:5173",
  }
})

io.on("connection",(socket)=>{
  // Handle Events
    socket.on("joinChat",({loggedInUserId,toUserId})=>{
        // whenever chat happens it happens inside the room
     
         const roomId=[loggedInUserId,toUserId].sort().join("_");
         console.log("Joining Room : "+roomId);
         socket.join(roomId);

    })

    socket.on("sendMessage",({firstName,loggedInUserId,toUserId,text})=>{
        const roomId=[loggedInUserId,toUserId].sort().join("_");
        console.log(firstName+" "+text);
        io.to(roomId).emit("messageReceived",{firstName,text});
    })

    socket.on("disconnect",()=>{})

});
}

module.exports=initializeSocket;