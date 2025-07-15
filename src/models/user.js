const mongoose=require("mongoose");
var validator = require('validator');
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName:{
        type:String

    },
    emailId:{
        type:String,
        required:true,
        unique:true,// note if we make any field unique then mongoDb automatically creates an index for that field
        //index:true, //if we want to create index manually then use this line
        lowercase:true,
        trim:true  ,//avoid spaces before in and after while entering email
        validate(value){
            if(!validator.isEmail(value))
            {
               throw new Error("Invalid Email Address!")
            }
        },
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){//note validate fn will only work if insert new object not input or patch so use run validators:true in this cases
            if(!["male","female","others"].includes(value))
            {
                throw new Error("Gender is not valid data")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://geographyandyou.com/images/user-profile.png"
    },
    about:{
       type:String,
       default:"This is a default about of the user!" //it automatically get inserted by default
    },
    skills:{
        type:[String]  //array of skills
    }
},
{
    timestamps:true, //it tells when user registered
}
);

userSchema.index({firstName:1, lastName:1}); // Create a compound index on firstName and lastName for faster queries

//why we should not create a lot of indexes?
//because it will slow down the write operations like insert, update, delete
//because every time we write something in the database, it has to update the indexes as well, which takes time
//so we should only create indexes on the fields that are frequently queried or searched


//Must not use arrow fn ever just below
userSchema.methods.getJWT = async function() {
    const user = this;
    
    try {
        const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    } catch (error) {
        console.error("Error in generating JWT:", error.message);
        throw new Error("Token generation failed.");
    }
};




userSchema.methods.validatePassword=async function(passwordInputByUser){
 const user=this;
 const hashedPassword=user.password; // Get the hashed password from the user document
    const isPasswordValid=await bcrypt.compare( passwordInputByUser, hashedPassword); // Compare the provided password with the hashed password in the database

    return isPasswordValid; // Return true if the password is valid, false otherwise
}

const User=mongoose.model("User",userSchema);


module.exports=User;