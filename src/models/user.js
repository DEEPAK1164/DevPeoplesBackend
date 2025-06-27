const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
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
        unique:true,
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
        default:"https://geographyandyou.com/images/user-profile.png",
         validate(value){
            if(!validator.isURL(value))
            {
               throw new Error("Invalid Photo Url "+value)
            }
        },
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
    timestamps:true,//it tells when user registered
}
);


userSchema.methods.getJwtToken=async function(){
 const user=this;
 const jwttoken= await jwt.sign({_id: user._id }, "DevPeoples#pyG4XsLkN", { expiresIn: "1d" }); // Generate a JWT token
    return jwttoken;
}



userSchema.methods.validatePassword=async function(passwordInputByUser){
 const user=this;
 const hashedPassword=user.password; // Get the hashed password from the user document
    const isPasswordValid=await bcrypt.compare( passwordInputByUser, hashedPassword); // Compare the provided password with the hashed password in the database

    return isPasswordValid; // Return true if the password is valid, false otherwise
}

const UserModel=mongoose.model("User",userSchema);


module.exports=UserModel;