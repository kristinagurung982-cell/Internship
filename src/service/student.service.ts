import { studentRepository } from "../repository";
import bcrypt from "bcrypt"

interface Student{
    first_name: string,
    last_name: string,
    email: string,
    mobile_number: number,
    student_password: string
}

const SALT = 10;

export class StudentService{

    static async createStudent(studentData: Student){
        const emailExists = await studentRepository.findOne({
            where: {email: studentData.email}
        })

        if(emailExists){
            throw new Error("Email already exists")
        }

        const hashedPassword = await bcrypt.hash(studentData.student_password, SALT)
    
        const student = studentRepository.create(studentData);
        student.student_password = hashedPassword
        return await studentRepository.save(student)
    }
}