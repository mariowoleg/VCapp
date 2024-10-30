import { Router } from "express";
import UserModel from "../models/User.js";

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

import { registerValidation, loginValidation} from "../validation.js" //Validators

const router = Router();

router.post("/register", async (req,res) => {
    //Data validation with validators defined with Joi previously
    const validation = registerValidation(req.body)
    if(validation.error) return res.status(400).send(validation.error.details[0].message)

    //Check in database if entered email already exists
    const emailExists = await UserModel.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send("Email already exists")

    //Hash passwords. First we define a num of rounds to salt
    const salt = await bcrypt.genSalt(10)
    const hashedPasswords = await bcrypt.hash(req.body.password, salt)

    //Create user with hashedPassword
    const user = new UserModel({
        email: req.body.email,
        password: hashedPasswords
    })
    
    try{
        //Save data in database
        const savedUser = await user.save()

        //Return identifier of created user
        res.send({"user": user._id})
    } catch(e){
        res.status(400).send(err)
    }
})

router.post("/login", async (req,res) => {
    //Data validation
    console.log("Por fin")
    const validation = loginValidation(req.body)
    if(validation.error){
        return res.status(400).send(validation.error.details[0].message)
    }

    //Check if entered email already exists
    const user = await UserModel.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Email not exists") 

    //Check if password is correct
    const password = await bcrypt.compare(req.body.password, user.password) 
    if(!password) return res.status(401).send("Invalid credential") //Check password
    
    
    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET,
        {
            expiresIn: "7d"
        }
    )
    res
        .cookie("access_token", token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            path:"/",
            maxAge: 60 * 60 * 24 * 7 * 1000 // 7 días en milisegundos
        })
        .send({ user });


})

export default router;