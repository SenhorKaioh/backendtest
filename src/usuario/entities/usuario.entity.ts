import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Produto } from '../../produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  public id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  public nome: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  public usuario: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  public senha: string;

  @Column({ length: 5000, nullable: true })
  public foto: string;

  @OneToMany(() => Produto, (produto) => produto.usuario)
  produtos: Produto[];
}
