import { Column, PrimaryGeneratedColumn, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity("user")
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:100, nullable:false})
    name:string;

    @Column({nullable:false, unique:true, length:20})
    username: string;

    @Column({unique:true})
    email: string;
    
    @Column({nullable: false, length:200})
    password: string;

    @Column()
    address: string;

    @CreateDateColumn({name: "created_at"})
    CreatedAt: Date;
e
    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;

}