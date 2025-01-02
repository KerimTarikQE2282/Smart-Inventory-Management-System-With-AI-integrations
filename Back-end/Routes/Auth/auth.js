const express=require('express');
const router=express.Router();
const {registerUser}=require('../../Controllers/AuthControllers/Registration')
const {login}=require('../../Controllers/AuthControllers/Login')
router.route('/').get(login).post(registerUser)

module.exports=router
