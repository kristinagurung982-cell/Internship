import { userRepository } from "../repository";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
}

const SALT = 10; 

export class UserService {

  static async createUser(userData: User) {
    const emailExists = await userRepository.findOne({
      where: { email: userData.email },
    });

    if (emailExists) {
      throw new Error("Email already exists");
    }

    const usernameExists = await userRepository.findOne({
      where: { username: userData.username },
    });

    if (usernameExists) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, SALT)

    const user = userRepository.create(userData);
    user.password = hashedPassword
    return await userRepository.save(user);
  }


  static async getUsers() {
    return await userRepository.find();
  }

  static async getUserByID(id: number) {
    return await userRepository.findOne({
      where: { id },
    });
  }


  static async deleteUserByID(id: number) {
    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }

    await userRepository.remove(user);
    return user;
  }


    static async updateUser(userid: number, userData: User) {
        const user = await userRepository.findOne({
        where: { id:userid },
        });

        if (!user) {
        return null;
        }

        const emailExists = await userRepository.findOne({
        where: { email: userData.email },
        });

        if (emailExists && emailExists.id !== userid) {
        throw new Error("Email already exists");
        }

        const usernameExists = await userRepository.findOne({
        where: { username: userData.username },
        });

        if (usernameExists && usernameExists.id !== userid) {
        throw new Error("Username already exists");
        }

        const updatedUser = userRepository.merge(user, userData)
        return await userRepository.save(updatedUser);
    }

  static async patchUser(id: number, userData: Partial<User>) {
    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }

    if (userData.email) {
      const emailExists = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (emailExists && emailExists.id !== id) {
        throw new Error("Email already exists");
      }
    }

    if (userData.username) {
      const usernameExists = await userRepository.findOne({
        where: { username: userData.username },
      });

      if (usernameExists && usernameExists.id !== id) {
        throw new Error("Username already exists");
      }
    }

    Object.assign(user, userData);

    return await userRepository.save(user);
  }

  static async login(username:string, password:string){
    const user = await userRepository.findOne({
        where: [{email: username}, 
            {username: username}
        ]
    })

    if(!user){
        throw new Error("Invalid username or password")
    }
    const isMatch  = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("Invalid username or password")
    }

    const payload = {
      id:user.id,
      username:user.username
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"10m"});
    return{
      token
    }
}

  
    
}


