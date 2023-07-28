const checkUserInputs=(req,res,next)=>{
    if(!req.body.email && !req.body.phoneNumber){
        res.status(400).json({message:"At least one of the fiels [email , phoneNumber] must be present"})
    }else{
        next();
    }
}
module.exports=checkUserInputs;