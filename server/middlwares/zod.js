import { email, z } from "zod"

const signUpzod = z.object({
    name : z.string().nonempty().min(3).trim().nonoptional(),
    password : z.string().min(6).nonempty().trim().nonoptional(),
    email : z.email().nonempty().trim().nonoptional()
})

const signInzod = z.object({
    password : z.string().min(6).nonempty().trim().nonoptional(),
    email : z.email().nonempty().trim().nonoptional()
})

const verifyOtp = z.object({
    email : z.email().nonempty().nonoptional(),
    otp : z.string().length(6).nonoptional()
})

const generateEmailsSchema = z.object({

    education : z.string(),
    skills : z.string(),
    projects : z.string(),
    internship : z.string().optional(),
    achievements : z.string().optional(),
    targetCompany : z.string(),
    targetRole : z.string(),
    recruiterName : z.string().optional()

})

export {
    signInzod,
    signUpzod,
    verifyOtp,
    generateEmailsSchema
}