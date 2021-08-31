import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from '../services/movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findMovie(@Query('name') name?: string) {
    const movie = await this.movieService.findMovie(name);

    return movie;
  }
}
