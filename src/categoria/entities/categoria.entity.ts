import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Produto } from '../../produto/entities/produto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  tipo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  slug: string;

  @ApiProperty()
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
