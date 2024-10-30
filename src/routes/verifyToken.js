import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

//Check if user is authorised
export default function(req, res, next){
    const token = req.cookies.access_token
    req.session = {user: null}
    
    if(!token) return res.status(401).send("Access denied")

    try{
        const data = jwt.verify(token, process.env.TOKEN_SECRET)
        req.session.user = data

    }catch(e){
        req.session.user = null
        return res.status(401).send("Invalid token")
    }
    next()

}