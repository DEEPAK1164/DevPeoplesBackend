const adminAuth=(req,res,next)=>{
  const token="xyz";
  const isAdminAuthorized=token==="xyz";
  if(isAdminAuthorized){
    next();
  }
    else{
      res.status(403).send("Forbidden: You are not authorized to access this resource.");
    }
}

module.exports={adminAuth};
