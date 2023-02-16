import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    {timestamps: true}
);

export default mongoose.model("User", userSchema);