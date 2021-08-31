import { CacheModule, Module } from '@nestjs/common';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MovieController],
  imports: [CacheModule.register()],
  providers: [MovieService, PrismaService],
  exports: [MovieService],
})
export class MovieModule {}
