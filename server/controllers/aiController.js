import { generateEmailsSchema } from "../middlwares/zod.js"
import axios from "axios";
import { EmailHistoryModel } from "../models/EmailHistory.js";
import express from "express"

async function generateEmails(req,res){

    try{

        const {success, data} = generateEmailsSchema.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message : "Invalid Input"
            })
        }

        const prompt = `
        
        You are an expert career outreach assistant.

Your task is to generate highly personalized cold outreach messages based on the user's academic background, technical skills, projects, and target role.

The user will provide:
- Name
- Education details
- Current degree/course
- Skills
- Projects
- Internship experience (optional)
- Achievements (optional)
- Target company
- Target role
- Recruiter/HR name (optional)

Instructions:
1. Analyze the user's profile carefully.
2. Highlight the strongest skills and most relevant projects.
3. Make the outreach concise, professional, and personalized.
4. Avoid sounding desperate or generic.
5. Keep the tone confident and value-driven.
6. The messages should feel human-written.
7. Use placeholders if recruiter name is not provided.
8. Follow the exact JSON format below.
9. Return ONLY valid JSON. No extra text, markdown, or explanation.

JSON Format:
{
  "gmail": {
    "subject": "string",
    "body": "string"
  },
  "linkedin": {
    "message": "string"
  },
  "followup": {
    "subject": "string",
    "body": "string"
  }
}

Generation Rules:

For Gmail:
- Subject should be short and compelling.
- Body should include:
  - Introduction
  - Why the user is reaching out
  - Relevant skills/projects
  - Interest in the company/role
  - CTA (asking for opportunity/referral)

For LinkedIn:
- Keep under 300 characters if possible.
- Shorter than email.
- More conversational.
- Mention one key skill/project.

For Follow-up:
- Assume no reply after 5-7 days.
- Be polite and short.
- Reiterate interest.
- Mention previous email.

Now generate based on this input:

User Profile:
{
  "name": "${req.name}",
  "education": "${data.education}",
  "skills":"${data.skills}",
  "projects": "${data.projects}",
  "internships": "${data.internship}",
  "achievements": "${data.achievements}",
  "target_company": "${data.targetCompany}",
  "target_role":" ${data.targetRole}",
  "recruiter_name": "${data.recruiterName}"
}
        
        `

    const aiResponse = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
            model: "llama-3.3-70b-versatile",
            messages: [
            {
                role: "user",
                content: prompt
            }
            ],
            temperature: 0.7,
            max_tokens: 1024
        },
        {
            headers: {
            'Authorization': `Bearer ${process.env.groqApiKey}`,
            'Content-Type': 'application/json'
            },
            timeout: 30000
        }
    );

    if(!aiResponse){
        return res.status(411).json({
            message : "Unable to fetch the response"
        })
    }

    const rawContent = aiResponse.data.choices[0].message.content;

    const cleanedContent = rawContent
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const generatedContent = JSON.parse(cleanedContent);

    const createHistory = await EmailHistoryModel.create({

        userId : req.userId,
        education : data.education,
        skills : data.skills,
        projects : data.projects,
        internship : data.internship,
        achievements : data.achievements,
        targetCompany : data.targetCompany,
        targetRole : data.targetRole,
        recruiterName : data.recruiterName,
        gmailSubject : generatedContent.gmail.subject,
        gmailBody : generatedContent.gmail.body,
        linkedinMessage : generatedContent.linkedin.message,
        followupSubject : generatedContent.followup.subject,
        followupBody : generatedContent.followup.body



    })

    if(!createHistory){
        return res.status(411).json({
            message : "Error while saving the history of the user"
        })
    }

    res.status(200).json({
        message : "Ai cold mail generated",
        generatedContent
    })



    }catch(e){

        

        res.status(500).json({
            message : "Error while generating the cold emails"
        })


    }
}

async function getHistory(req, res) {
    try {
        const history = await EmailHistoryModel.find({
            userId: req.userId
        }).select(
            "-userId -education -skills -projects -internship -achievements"
        );

        if (history.length === 0) {
            return res.status(404).json({
                message: "No history found"
            });
        }

        return res.status(200).json( history );

    } catch (e) {
        

        return res.status(500).json({
            message: "Error while fetching the data"
        });
    }
}


export {
    generateEmails,
    getHistory
}
