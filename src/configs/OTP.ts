import crypto from "crypto";
import { Router } from "express";
import otpRepository from "../repository/otpRepository";
import { EmailService } from "../service/email.service";

const router = Router();

function generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
}

router.post("/send-otp", async (req, res) => {
    const {email} = req.body;
    const otp = generateOTP();
    
    await otpRepository.save({ email, otp: otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
    await EmailService.sendEmail(email, "dialychina OTP", `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`);
    res.json({ success: true, message: "OTP sent" });
});

export default router;
