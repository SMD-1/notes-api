import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    subject: {
        type: String,
        required: true
    },
    size: {
        type: Number
    },
    url: {
        type: String
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'     
    }
    
},
    {timestamps: true}
);

export default mongoose.model("notes", userSchema);