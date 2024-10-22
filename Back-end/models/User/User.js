const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  
    username: {
     type: String, 
     required: [true,"please provide user name"],
     unique: true
     },

    password: { 
    type: String,
    required: true
    },
    email: { 
    type: String, 
    required: true, 
    unique: true 
    },
    role: { 
    type: String,
    enum: ['admin', 'sales_personnel', 'warehouse_personnel',"accountant"], 
    default: 'employee' },
    fullName: { 
    type: String
    },
    phoneNumber: { 
    type: String
    },
    profilePicture: { 
    type: String
    },
    address: { 
    type: String
    },
    dateOfBirth: { 
    type: Date
    },
    department: { 
    type: String
    },
    dateCreated: { 
    type: Date,
    default: Date.now 
    },
    lastLogin: { 
    type: Date
     },
    status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended'], 
    default: 'active'
     },
    permissions: { 
    type: String
     },
   
});

userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT=function(){
    return jwt.sign({user:{id:this._id,username:this.username}},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_LIFETIME
    })
};
userSchema.methods.passwordChecker=async function(suppliedPassword){
    const isMatch=await bcrypt.compare(suppliedPassword,this.password)
    return isMatch;
}

module.exports=mongoose.model('User',userSchema);