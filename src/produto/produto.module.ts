import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './controllers/produto.controller';
import { CategoriaService } from 'src/categoria/services/categoria.service';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    CategoriaModule,
    UsuarioModule,
  ],
  providers: [ProdutoService, CategoriaService],
  controllers: [ProdutoController],
  exports: [TypeOrmModule],
})
export class ProdutoModule {}
