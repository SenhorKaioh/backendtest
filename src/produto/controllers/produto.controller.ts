import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../services/produto.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }

  @Get('/preco_maior/:preco')
  @HttpCode(HttpStatus.OK)
  findByMaiorPreco(
    @Param('preco', ParseFloatPipe) preco: number,
  ): Promise<Produto[]> {
    return this.produtoService.findByMaiorPreco(preco);
  }

  @Get('/preco_menor/:preco')
  @HttpCode(HttpStatus.OK)
  findByMenorPreco(
    @Param('preco', ParseFloatPipe) preco: number,
  ): Promise<Produto[]> {
    return this.produtoService.findByMenorPreco(preco);
  }

  @Get('/desconto_maior/:desconto')
  @HttpCode(HttpStatus.OK)
  findByMaiorDesconto(
    @Param('desconto', ParseIntPipe) desconto: number,
  ): Promise<Produto[]> {
    return this.produtoService.findByMaiorDesconto(desconto);
  }

  @Get('/desconto_menor/:desconto')
  @HttpCode(HttpStatus.OK)
  findByMenorDesconto(
    @Param('desconto', ParseIntPipe) desconto: number,
  ): Promise<Produto[]> {
    return this.produtoService.findByMenorDesconto(desconto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}
