const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Send a POST request to reqres.in API for login
        const response = await axios.post("https://reqres.in/api/login", {
            email,
            password,
        });
        
        const token = response.data.token
        
        if (response.data.token) {
            return res.status(201).json({ message: `User LogIn Successfully`, token});
        } else {
            return res.status(401).json({ message: `Invalid Credentials` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { userRouter };
