import { MovieService } from '../services/movie.service';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    findMovie(name?: string): Promise<any>;
}
