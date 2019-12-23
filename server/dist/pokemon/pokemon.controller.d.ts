import { PokemonService } from './pokemon.service';
import { Pokemon } from './interfaces/pokemon.interface';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    find(): Promise<Pokemon[]>;
    findFavourite(email: any): Promise<Pokemon[]>;
    update(favourite: Pokemon, email: string): Promise<void>;
    deleteFavourite(id: string): Promise<void>;
}
