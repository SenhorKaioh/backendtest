import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoriaController } from './categoria/controllers/categoria.controller';
import { CategoriaService } from './categoria/services/categoria.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'db_greenconomy',
      entities: [Categoria],
      synchronize: true,
    }),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class AppModule {}
