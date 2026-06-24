import express from "express"
import { authMiddleware } from "../middlwares/authMiddleware.js";
import { generateEmails, getHistory } from "../controllers/aiController.js";
const aiRouter = express.Router();

aiRouter.use(authMiddleware);

aiRouter.post('/generate-cold-mail', generateEmails);
aiRouter.get('/get-history', getHistory);

export default aiRouter;
