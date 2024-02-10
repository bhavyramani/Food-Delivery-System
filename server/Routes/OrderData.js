const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res)=>{
    let data = req.body.order_data;
    await data.splice(0, 0, {Order_date: req.body.order_date});

    let eId = await Order.find({'email':req.body.email});
    if(eId.length == 0){
        try{
            await Order.create({
                email: req.body.email,
                order_data : [data]
            }).then(()=>{
                res.json({success:true});
            });
        }catch(error){
            console.log(error.message);
            res.send("Server Error", error.message);
        }
    }else{
        try{
            await Order.findOneAndUpdate({'email':req.body.email},
                {$push:{order_data:data}}).then(()=>{
                    res.json({success:true});
            });
        }catch(error){
            console.log(error.message);
            res.send("Server Error", error.message);
        }
    }
});

router.post('/deleteorder', async (req, res)=>{
    try{
        let myData = await Order.findOne({email:req.body.email});
        let index = -1;
        for(let i = 0; i < myData.order_data.length; i++){
            if(JSON.stringify(myData.order_data[i]) == JSON.stringify(req.body.arrayData)){
                index = i;
                break;
            }
        }
        if(index != -1){
            myData.order_data.splice(index, 1);
        }
        await Order.findOneAndUpdate({email:req.body.email},{order_data:myData.order_data}).then(()=>{
            res.json({orderData:myData});
        });
    }catch (error) {
        res.status(400).send("Server Error", error.message);
    }
});

router.post('/myorderdata', async (req, res)=>{
    try {
        let myData = await Order.findOne({email:req.body.email});
        res.json({orderData:myData});
    } catch (error) {
        res.send("Server Error", error.message);
    }
});
module.exports = router;