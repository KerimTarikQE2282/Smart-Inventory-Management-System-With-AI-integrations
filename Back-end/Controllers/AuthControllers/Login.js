const StatusCodes=require('http-status-codes')
const User=require('../../models/User/User');
const { UnauthenticatedError, BadRequestError } = require('../../errors');


const login=async (req,res)=>{
    console.log(req.query)
const {email,password}=req.query;
if(!email || !password){
    throw new BadRequestError("please provide email and password")
}
const userAccount=await User.findOne({email:email})
if(!userAccount){
    throw new UnauthenticatedError("User Doesnt Exist");
}
const isPasswordCorrect=await userAccount.passwordChecker(password);
if(!isPasswordCorrect){
    throw new UnauthenticatedError("Invalid Credentials")
}
res.status(StatusCodes.OK).json({user:userAccount,token:userAccount.createJWT()});
}
module.exports={login}