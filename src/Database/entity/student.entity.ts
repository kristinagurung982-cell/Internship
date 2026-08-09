
import { Column, PrimaryGeneratedColumn, CreateDateColumn, Entity } from "typeorm";


@Entity("students")
export class Students{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:100})
    name:string;

    @Column({length:100})
    last_name:string;

    @Column({unique: true})
    email:string;

    @Column({unique: true})
    mobile_number: number;

    @Column()
    student_password: string;

}