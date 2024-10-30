import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"; // dotenv is used to manage environment variables
dotenv.config()
import authRoute from "./routes/auth.js"; // Authentication routes
import verifyToken from "./routes/verifyToken.js";




const uri = process.env.DB_URI;

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto a la URL de tu cliente
  credentials: true // Esto permite el uso de cookies
}));
app.use(cookieParser())

mongoose.connect(uri)
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });


//Nested routes for register and login
app.use("/api/users", authRoute)

app.use("/protected", verifyToken, async (req, res) => {
  // request.user is getting fetched from Middleware after token authentication
  const {user} = req.session
  if(!user) return res.status(403).send

  res.send(user)

});

app.get("/autoLogin", (req,res) => {
  console.log("Hi")

  return res.sendStatus(200);
})

//Not used yet
app.get("/", function (req,res){
    res.send("Hello world")
    const token = req.cookies.access_token
    console.log(token)

})

app.listen(3001, () => {
  console.log("server is running")
})