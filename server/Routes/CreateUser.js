const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwtSecret = "MynameisEndtoEndYouTubeChannel$#";
// jwtsecret 32 chars
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/createuser", [
    body('name', 'Name should contain at least 5 characters.').isLength({ min: 5 }),
    body('email', 'Invalid Mail').isEmail(),
    body('password', 'Password should contain at least 8 characters.').isLength({ min: 8 }),
    body('location', 'Location is neccesary').isLength({min:4})
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const check = await User.find({ email: req.body.email });
        if (check.length) {
            res.status(400).json({ errors: [{msg:"There is already an account with this mail id. "}] });
        } else {
            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(req.body.password, salt);

            try {
                await User.create({
                    name: req.body.name,
                    password: secPassword,
                    location: req.body.location,
                    email: req.body.email
                }).then(res.json({ success: true }));
            } catch (error) {
                console.log(error);
                res.json({ success: false });
            }
        }
    });



router.post("/loginuser", [
    body('email', 'Invalid Mail').isEmail()
]
    , async (req, res) => {
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData)
                return res.status(400).json({ errors:[{msg: "Email not found!"}] });
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare)
                return res.status(400).json({ errors: [{msg:"Invalid Password"}] });
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken, username : userData.name });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });

module.exports = router;