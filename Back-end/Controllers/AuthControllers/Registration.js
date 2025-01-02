const StatusCodes=require('http-status-codes')
const User=require('../../models/User/User')

const registerUser=async (req,res)=>{
    const createdUser=await User.create(req.body);
    console.log("🚀 ==> file: Registration.js:6 ==> registerUser ==> req.body):", req.body);

    res.status(StatusCodes.OK).json({token:createdUser.createJWT(),user:createdUser.username})

}
module.exports={registerUser};