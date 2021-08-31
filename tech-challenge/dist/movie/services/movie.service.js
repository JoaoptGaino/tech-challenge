"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const api_1 = require("../../services/api");
let MovieService = class MovieService {
    constructor(cacheManager, prisma) {
        this.cacheManager = cacheManager;
        this.prisma = prisma;
    }
    async findMovie(name) {
        const stored = await this.cacheManager.get(name);
        if (!stored) {
            const databaseMovies = await this.prisma.movie.findMany({
                where: { Title: { contains: name, mode: 'insensitive' } },
            });
            if (databaseMovies.length > 0) {
                return databaseMovies;
            }
            else {
                try {
                    const apiMovie = await api_1.api.get(`?apikey=925eba28&s=${name}`);
                    const response = apiMovie.data.Search;
                    await this.cacheManager.set(name, response);
                    await this.prisma.movie.createMany({ data: response });
                    return response;
                }
                catch (err) {
                    throw new common_1.BadRequestException();
                }
            }
        }
        return { Storedziado: stored };
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map