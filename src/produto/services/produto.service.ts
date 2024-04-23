import { Produto } from './../entities/produto.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByMaiorPreco(preco: number): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        basePreco: MoreThan(preco),
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByMenorPreco(preco: number): Promise<Produto[]> {
    const produto = await this.produtoRepository.find({
      where: {
        basePreco: LessThan(preco),
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async create(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    const buscaProduto = await this.findById(produto.id);

    if (!buscaProduto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    const buscaProduto = await this.findById(id);

    if (!buscaProduto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return await this.produtoRepository.delete(id);
  }
}
