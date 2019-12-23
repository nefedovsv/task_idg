import { OnModuleInit } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
export declare class DBService implements OnModuleInit {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    onModuleInit(): void;
}
