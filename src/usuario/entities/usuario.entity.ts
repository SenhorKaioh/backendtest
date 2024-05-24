import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Produto } from '../../produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  public nome: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'email@email.com.br' })
  @Column({ length: 255, nullable: false })
  public usuario: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  public senha: string;

  @ApiProperty()
  @Column({ length: 5000, nullable: true })
  public foto: string;

  /**
   * Função do usuario.
   * Pode ser "USUARIO", "VENDEDOR" ou "ADMIN".
   * Os usuários administradores podem adicionar, editar, excluir qualquer tipo de produto
   * Os vendedores podem adicionar, editar e excluir apenas os produtos cadastrados por ele.
   *
   * O padrão é "USUARIO"
   * @example "USUARIO"
   */
  @ApiProperty({ required: false })
  @Column({ nullable: true, default: 'USUARIO' })
  public funcao: string;

  // @ApiProperty({ required: false })
  // @Column({ type: 'boolean', nullable: true, default: false })
  // public administrador: boolean;

  @OneToMany(() => Produto, (produto) => produto.usuario)
  produtos: Produto[];
}
