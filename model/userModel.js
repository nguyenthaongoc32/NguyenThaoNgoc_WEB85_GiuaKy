import mongoose from "mongoose";
import  Collections  from "../collection/collection.js";


const userSchame = new mongoose.Schema({
    id :{ type : mongoose.Schema.Types.ObjectId},
    userName : { type: String, required: true },
    email :{ type: String, required: true, unique: true },
    password : String,
    api_key: String,
});

const userModel= mongoose.model(Collections.USER, userSchame);
export default userModel;