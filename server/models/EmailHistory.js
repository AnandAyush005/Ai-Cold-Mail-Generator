import mongoose from "mongoose";

const emailHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    education: {
        type: String,
        required: true
    },

    skills: {
        type: String,
        required: true
    },

    projects: {
        type: String,
        required: true
    },

    internship: {
        type: String,
        default: "No experience"
    },

    achievements: {
        type: String,
        default: "No achievement"
    },

    targetCompany: {
        type: String,
        required: true
    },

    targetRole: {
        type: String,
        required: true
    },

    recruiterName: {
        type: String,
        default: "Not specified"
    },

    gmailSubject: {
        type: String,
        required: true
    },

    gmailBody: {
        type: String,
        required: true
    },

    linkedinMessage: {
        type: String,
        required: true
    },

    followupSubject: {
        type: String,
        required: true
    },

    followupBody: {
        type: String,
        required: true
    }
});

const EmailHistoryModel = mongoose.model(
    "emailHistories",
    emailHistorySchema
);

export {
    EmailHistoryModel
};