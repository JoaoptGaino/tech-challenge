import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma.service';
export declare class MovieService {
    private cacheManager;
    private readonly prisma;
    constructor(cacheManager: Cache, prisma: PrismaService);
    findMovie(name: string): Promise<any>;
}
