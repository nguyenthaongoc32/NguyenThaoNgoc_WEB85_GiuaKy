import mongoose from "mongoose";
import Collections  from "../collection/collection.js";

const postSchame = new mongoose.Schema({
    id :{ type : mongoose.Schema.Types.ObjectId},
    userId : { type: String, required: true },
    content :{ type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const postModel= mongoose.model(Collections.POST, postSchame);
export default postModel;