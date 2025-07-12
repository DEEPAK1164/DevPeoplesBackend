const socket=require("socket.io");
const crypto=require("crypto");
const { ChatModel } = require("../models/chat");

const getSecretRoomId=(loggedInUserId,toUserId)=>{
  return crypto.createHash("sha256")
  .update([loggedInUserId,toUserId]
    .sort()
    .join("_"))
    .digest("hex");
}



const initializeSocket=(server)=>{
    
const io=socket(server,{
  cors:{
    origin:"http://localhost:5173",
  }
})

io.on("connection",(socket)=>{
  // Handle Events
    socket.on("joinChat",({firstName,loggedInUserId,toUserId})=>{
        // whenever chat happens it happens inside the room
     
         const roomId=getSecretRoomId(loggedInUserId,toUserId);
         console.log(firstName+" Joining Room : "+roomId);
         socket.join(roomId);

    })

socket.on("sendMessage", async ({ firstName, lastName, loggedInUserId, toUserId, text }) => {
  const roomId = getSecretRoomId(loggedInUserId, toUserId);
  console.log(firstName + " " + text);

  try {
    let chats = await ChatModel.findOne({
      participants: { $all: [loggedInUserId, toUserId] }
    });

    if (!chats) {
      chats = new ChatModel({
        participants: [loggedInUserId, toUserId],
        messages: [],
      });
    }

    chats.messages.push({
      senderId: loggedInUserId,
      text
    });

    await chats.save();

    // ✅ Move this INSIDE the try after save
    const newMsg = chats.messages[chats.messages.length - 1];
    io.to(roomId).emit("messageReceived", {
      firstName,
      lastName,
      text: newMsg.text,
      createdAt: newMsg.createdAt,
      senderId: newMsg.senderId
    });

  } catch (err) {
    console.log("something went wrong", err);
  }
});



    socket.on("disconnect",()=>{})

});
}

module.exports=initializeSocket;