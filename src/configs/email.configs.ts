import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const tarnsporter = nodemailer.createTransport({
    host :"smtp.gmail.com",
    port : 587,
    secure:false,
    auth:{
        user:"dialychina@gmail.com",
        pass:"jznqnmyinhdvzdpq"
    },

});
