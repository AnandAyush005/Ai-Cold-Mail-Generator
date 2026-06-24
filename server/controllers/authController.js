
import { signInzod, signUpzod, verifyOtp } from "../middlwares/zod.js"
import { User } from "../models/Users.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken"

async function signupController(req,res){
    
    try {

        const {success, data} = signUpzod.safeParse(req.body);
        
        if(!success){
            return res.status(411).json({
                message : "Invalid Input"
            })
        }

        const findUser = await User.findOne({email : data.email});

        if(findUser){
            return res.status(411).json({
                message : "User with this email is already exist"
            })
        }


        res.status(200).json({
            message : "User is signed up"
        })

        
    } catch (error) {
        
        
        res.status(500).json({
            message : "Internal server issue"
        })
    }

}

async function signinController(req,res){

    try {

        const {success, data} = signInzod.safeParse(req.body);
        
        if(!success){
            return res.status(411).json({
                message : "Invalid Input"
            })
        }

        const findUser = await User.findOne({email : data.email});

        if(!findUser || await !findUser.comaprePassword(data.password)){
            return res.status(411).json({
                message : "Invalid Credentialse"
            })
        }

        if(!findUser.isVerified){
            return res.status(411).json({
                message : "User is not verified"
            })
        }

        const token = await generateToken(findUser._id);

        res.status(200).json({
            message : "User is logged in",
            token : token
        })

    } catch (error) {
        
        
        res.status(500).json({
            message : "Internal server issue"
        })

    }

}

async function verifyOtpController(req,res){

    try {
        
        const {success, data} = verifyOtp.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message : "Error while verifying the otp"
            })
        }

        const findUser = await User.findOne({email : data.email});
        
        if(!findUser) return res.status(404).json({message : "user not found"});

        if(findUser.isVerified) return res.status(411).json({message : "User is already verfied"});

        if(findUser.otpExpiry < new Date()) return res.status(411).json({message : "Otp is Expired"});

        findUser.isVerified = true;
        findUser.otp = undefined;
        findUser.otpExpiry = undefined;

        await findUser.save();

        const token = await generateToken(findUser._id);

        res.status(200).json({
            message : "User is verified now",
            token : "Bearer " + token
        })


    } catch (error) {

        
        res.status(411).json({
            messsage : "Unable to verify the user"
        })
    }
}

async function resendOtp(req,res) {

    try {

        const email = req.body.email;

        if(!email){
            return res.status(411).json({
                message : "Invalid Input"
            })
        }

        const findUser = await User.findOne({email});

        if(!findUser){
            return res.status(404).json({
                message : "User not found"
            })
        }

        if(findUser.isVerified){
            return res.status(403).json({
                message : "User is already verified"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10*60*1000); 

        findUser.otp = otp;
        findUser.otpExpiry = otpExpiry;
        await findUser.save();

        try {
            
            await sendEmail({
                to : data.email,
                subject : "Your OTP code for AL COLD MAIL GENERATOR",
                text : `Your otp is ${otp}. It is valid for only 10 minutes`
            })

        } catch (error) {
            
        }
        
        

        res.status(200).json({
            message : "Otp is sended"
        })

    } catch (error) {

        

        res.status(500).json({
            message : "Error while generating the otp"
        })
        
    }
    
}

async function profile(req, res) {
  return res.status(200).json({
    success: true,
    message: "User authenticated"
  });
}
async function generateToken(id) {

    const token = await jwt.sign({ id : id }, process.env.JWT_SECRET, {expiresIn : "24h"});
    return token;
}

export {
    signinController,
    signupController,
    verifyOtpController,
    resendOtp,
    profile
}