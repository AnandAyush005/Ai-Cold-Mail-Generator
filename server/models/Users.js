import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },

    password : {
        type : String,
        required : true
    },

    isVerified : {
        type : Boolean,
        default : false
    },

    otp : {
        type : String
    },

    otpExpiry : {
        type : Date
    },
})

userSchema.pre("save", async function () {
    
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
    return;

})

userSchema.methods.comaprePassword = async function (newPassword) {
    return await bcrypt.compare(newPassword, this.password);
}

const User = new mongoose.model("users", userSchema);

export {
    User
}
