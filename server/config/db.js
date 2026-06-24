import mongoose from "mongoose";
import dns from "dns"

dns.setServers(['8.8.8.8','8.8.4.4']);

function connectDb(){
    return mongoose.connect(`${process.env.MONGODB_URL}/ai-cold-mail-generator`);
}

export {
    connectDb
}