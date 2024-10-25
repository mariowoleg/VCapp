//mongoose is an ODM used to create data schemas to db
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    password:{
        type: String,
        required: true,
        min: 3,
        max: 255
    }
})

const UserModel = mongoose.model("users", UserSchema)


export default UserModel