import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma.service';
import { api } from 'src/services/api';

@Injectable()
export class MovieService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
  ) {}
  async findMovie(name: string) {
    const stored = await this.cacheManager.get(name);
    /*TODO
      Caso encontrar, os dados devem ser retornados. Caso não, deve ser feita a integração com a API dos filmes, salvando os dados no banco de dados da aplicação e em memória, e retornando os dados.
    */
    if (!stored) {
      const databaseMovies = await this.prisma.movie.findMany({
        where: { Title: { contains: name, mode: 'insensitive' } },
      });
      if (databaseMovies.length > 0) {
        return databaseMovies;
      } else {
        try {
          const apiMovie = await api.get(`?apikey=925eba28&s=${name}`);

          const response = apiMovie.data.Search;
          await this.cacheManager.set(name, response);
          await this.prisma.movie.createMany({ data: response });
          return response;
        } catch (err) {
          throw new BadRequestException();
        }
      }
    }
    return { Storedziado: stored };
  }
}
