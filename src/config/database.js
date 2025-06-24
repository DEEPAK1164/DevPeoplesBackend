const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://1164dkm:ddNg0R7IDhO4nzYp@namastenode.xfqk0.mongodb.net/DevPeoples");
}

connectDB()
    .then(() =>{
        console.log("MongoDB connected successfully")
    }).catch((err) => {console.error("MongoDB connection error:", err)});