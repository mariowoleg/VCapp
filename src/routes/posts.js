import { Router } from "express"
import verifyToken from "./verifyToken.js";

const router = Router()

console.log("Estoy en el postsRoute")

router.get('/', verifyToken, (req, res) => {
    res.send(req.user)
})


export default router;