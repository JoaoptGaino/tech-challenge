import { Cache } from 'cache-manager';
import { MovieService } from './movie.service';
export declare class MovieController {
    private readonly movieService;
    private cacheManager;
    constructor(movieService: MovieService, cacheManager: Cache);
    findMovie(name?: string): Promise<any>;
    findStorage(name: string): Promise<unknown>;
}
