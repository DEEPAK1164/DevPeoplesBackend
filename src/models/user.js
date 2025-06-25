const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName:{
        type:String,
        required:true,
        minLength:4
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true, //it tells when user registered
}
);

const UserModel=mongoose.model("User",userSchema);


module.exports=UserModel;