import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { EmailService } from "../service/email.service";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const result = await UserService.createUser(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
      });
    } catch (e: any) {
      console.log(e);

      if (
        e.message === "Email already exists" ||
        e.message === "Username already exists"
      ) {
        return res.status(409).json({
          success: false,
          message: e.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }


  static async getUsers(req: Request, res: Response) {
    try {
      const result = await UserService.getUsers();

      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: result,
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }


  static async getUserByID(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const user = await UserService.getUserByID(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User fetched successfully.",
        data: user,
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }


  static async deleteUserByID(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const user = await UserService.deleteUserByID(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: `User with id ${id} deleted successfully.`,
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }


  static async updateUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const user = await UserService.updateUser(id, req.body);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User updated successfully.",
        data: user,
      });
    } catch (e: any) {
      console.log(e);

      if (
        e.message === "Email already exists" ||
        e.message === "Username already exists"
      ) {
        return res.status(409).json({
          success: false,
          message: e.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }


  static async patchUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const user = await UserService.patchUser(id, req.body);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User patched successfully.",
        data: user,
      });
    } catch (e: any) {
      console.log(e);

      if (
        e.message === "Email already exists" ||
        e.message === "Username already exists"
      ) {
        return res.status(409).json({
          success: false,
          message: e.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }

  static async login (req: Request, res: Response){
        try{
            const{username,password}= req.body;
            const result = await UserService.login(username,password);
            return res.status(200).json({message:"login sucessful",data:result.token});

        }catch(error){
            if(error.message === "Invalid username or password"){
                return res.status(401).json({message:error.message});
            }
            return res.status(500).json({message:"internal server error"})
        }
    }

    static async contactUs(req:Request,res:Response){
      try{
        const { name, email,message } = req.body;
        await EmailService.sendEmail(
          "kristinatamu0102@gmail.com",
          `New Contact From Submission from ${name}`,
          `<p><strong>Email:</strong> ${email}</p><p><strong>Message</strong> ${message}</p>`
        );

        res.json({ success: true, message: "message sent successfully"});
      }catch(error){
        console.log(error)
        return res.status(500).json({message:error.message});
      }
    }
}