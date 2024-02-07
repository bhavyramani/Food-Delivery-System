const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/profileuser', async (req, res)=>{
    let user_data = await User.findOne({'email':req.body.email});
    try{
        res.send({username:user_data.name, email:user_data.email});
    }catch (error){
        console.log("error");
        res.send("Server error");
    }
});

module.exports = router;