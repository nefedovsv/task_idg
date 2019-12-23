import { Model } from 'mongoose';
import { PokemonDto } from './dto/pokemon.dto';
import { PokemonData, PokemonsPage, Pokemon } from './interfaces/pokemon.interface';
export declare class PokemonService {
    private readonly pokemonModel;
    constructor(pokemonModel: Model<Pokemon>);
    find(): Promise<Pokemon[]>;
    findFavourite(email: string): Promise<Pokemon[]>;
    update(pokemon: Pokemon, email: string): Promise<void>;
    deleteFavourite(id: string): Promise<void>;
    createDB(): Promise<any>;
    getPokemonsList(): Promise<PokemonData[]>;
    getPokemonsPage(pageNumber: number): Promise<PokemonsPage>;
    getPokemonNamesFromDB(): Promise<string[]>;
    pokemonfilter(pokemonsList: PokemonData[], namesFromDB: string[]): PokemonData[];
    loadPokemon(pokemonData: PokemonData): Promise<Pokemon>;
    savePokemonInDB(item: PokemonDto): Promise<void>;
}
