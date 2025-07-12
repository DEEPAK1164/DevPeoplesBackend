const express=require("express");
const{userAuth}=require("../middlewares/auth")
const{ChatModel}=require("../models/chat");
const chatRouter=express.Router();

chatRouter.get("/chat/:toUserId",userAuth, async(req,res)=>{
const {toUserId}=req.params;
const loggedInUserId=req.user._id;

try{
let chat=await ChatModel.findOne({
participants:{$all:[loggedInUserId,toUserId]},
}).populate({
    path:"messages.senderId",
    select:"firstName lastName",
})
if(!chat){
    chat=new ChatModel({
        participants:[loggedInUserId,toUserId],
        messages:[],
    })
    await chat.save();
}
res.json({
  messages: chat.messages.map((msg) => ({
    text: msg.text,
    createdAt: msg.createdAt,
    senderId: msg.senderId._id,
    firstName: msg.senderId.firstName,
    lastName: msg.senderId.lastName,
  }))
});

}catch(err){
  console.error(err);
}
})


module.exports=chatRouter;