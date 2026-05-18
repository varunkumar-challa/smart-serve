const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/signup', async (req,res)=>{
    try{
        const {name, phone, password} = req.body;
        const existingUser = await User.findOne({phone});
        if(existingUser) {
            return res.status(400).json({message: 'Email already in use'});
        }
        const user = new User({name, phone, password});
        await user.save();
        res.status(201).json({message: 'User created'});
    } catch(e){
        res.status(500).json({message:'Unable to signup'});
    }
});

router.post('/login', async (req,res)=>{
    try{
        const {phone, password} = req.body;
        const existingUser = await User.findOne({phone});
        if (!existingUser || !(await existingUser.comparePassword(password))) {
            throw new Error('Invalid login credentials');
        }
        const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_TOKEN);
        res.json({ existingUser, token });
    } catch(e){
        res.status(500).json({error: e.message});
        console.log(e);
    }
});


module.exports = router;