import { DataSource } from "typeorm"
import "reflect-metadata"
import { User } from "../Database/entity/user.entity"
import { Students } from "../Database/entity/student.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "saumya",
    password: "MySQLpassword1",
    database: "mern",
    synchronize: false,
    logging: true,
    entities: [User, Students],
    subscribers: [],      
    migrations: ["src/migrations/*.ts"],
})

export const initializeDatabase = async () => {
    try{
        await AppDataSource.initialize()
        console.log("Databse Connected.")
    }catch(error){
        console.log("Failed to connect databse")
        throw error
    }
}   