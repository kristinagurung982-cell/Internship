import {body} from "express-validator";

export const createUserSchema = [
    body("name")
    .notEmpty() 
    .withMessage("name is required"),
    
    body("email")
    .isEmail()
    .withMessage("Valid email is required"),

    body("username")
    .notEmpty() 
    .withMessage("username is required"),

    body("password")
    .isLength({min:8}) 
    .withMessage("password must be atleast 8 characters"),

    body("address")
    .notEmpty() 
    .withMessage("address is required"),
]