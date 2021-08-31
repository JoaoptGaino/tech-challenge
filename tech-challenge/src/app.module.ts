import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [CacheModule.register(), MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
