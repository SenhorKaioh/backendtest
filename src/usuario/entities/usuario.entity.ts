import { Transform, TransformFnParams } from "class-transformer"
import { IsNotEmpty, IsEmail, MinLength } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: "tb_usuario"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    public id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    public nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    public usuario: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    public senha: string

    @Column({length: 5000, nullable: true }) 
    public foto: string
}