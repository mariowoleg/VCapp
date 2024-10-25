import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv"; // dotenv is used to manage environment variables
dotenv.config()
import authRoute from "./routes/auth.js"; // Authentication routes
import postRoute from "./routes/posts.js"; // Publish routes




const uri = process.env.DB_URI;


const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect(uri)
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });


//Nested routes for register and login
app.use("/api/users", authRoute)

//Not used yet
app.use("/api/posts", postRoute)

//Not used yet
app.get("/", function (req,res){
  res.send("Hello world")
  console.log("HIIII")
})

app.listen(3001, () => {
  console.log("server is running")
})