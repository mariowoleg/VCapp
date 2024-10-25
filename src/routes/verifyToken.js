import jwt from "jsonwebtoken"

//Check if user is authorised
export default function(req, res, next){
    const token = req.header("token")
    if(!token) return res.status(401).send("Access denied")

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(e){
        res.status(400).send("Invalid token")
    }
}