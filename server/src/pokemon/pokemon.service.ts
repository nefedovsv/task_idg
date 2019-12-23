import { Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import fetch from 'node-fetch';
import { PokemonDto } from './dto/pokemon.dto';
import {
  PokemonData,
  PokemonsPage,
  DataFromDB,
  Pokemon,
} from './interfaces/pokemon.interface';
import { baseUrl } from './config/keys';

const POKEMONS_AMOUNT = 50;

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel('Pokemon')
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async find(): Promise<Pokemon[]> {
    return await this.pokemonModel.find({ isFavourite: false, user: null });
  }

  async findFavourite(email: string): Promise<Pokemon[]> {
    return await this.pokemonModel.find({ isFavourite: true, user: email });
  }

  async update(pokemon: Pokemon, email: string): Promise<void> {
    const favourite = await this.pokemonModel.find({
      id: pokemon.id,
      user: email,
    });
    if (!favourite.length) {
      const favorite = { ...pokemon, isFavourite: true, user: email };
      delete favorite._id;
      await this.savePokemonInDB(favorite);
      return;
    }
    return;
  }

  async deleteFavourite(id: string): Promise<void> {
    return this.pokemonModel.findByIdAndDelete(id);
  }

  async createDB(): Promise<any> {
    const pokemonsList: PokemonData[] = await this.getPokemonsList();

    const namesFromDB: string[] = await this.getPokemonNamesFromDB();

    const loadList: PokemonData[] = this.pokemonfilter(
      pokemonsList,
      namesFromDB,
    );

    for (const item of loadList) {
      const pokemon: Pokemon = await this.loadPokemon(item);
      this.savePokemonInDB(pokemon);
    }
    // tslint:disable-next-line:no-console
    return console.log('DB was created');
  }

  async getPokemonsList(): Promise<PokemonData[]> {
    let needToLoad: boolean = true;
    let pageNumber: number = 0;
    const pokemonList: PokemonData[] = [];

    while (needToLoad) {
      const page = await this.getPokemonsPage(pageNumber);
      pageNumber++;
      if (page.next) {
        pokemonList.push(...page.results);
      } else {
        needToLoad = false;
      }
    }
    return pokemonList;
  }

  async getPokemonsPage(pageNumber: number): Promise<PokemonsPage> {
    const url = `${baseUrl}?offset=${pageNumber *
      POKEMONS_AMOUNT}&limit=${POKEMONS_AMOUNT}`;
    const response = await fetch(url);
    return response.json();
  }

  async getPokemonNamesFromDB(): Promise<string[]> {
    const namesFromDB: DataFromDB[] = await this.pokemonModel.find(
      {},
      { name: 1 },
    );
    return namesFromDB.map(item => item.name);
  }

  pokemonfilter(
    pokemonsList: PokemonData[],
    namesFromDB: string[],
  ): PokemonData[] {
    return pokemonsList.filter(item => !namesFromDB.includes(item.name));
  }

  async loadPokemon(pokemonData: PokemonData): Promise<Pokemon> {
    const response = await fetch(pokemonData.url);
    const data = await response.json();
    const pokemon: Pokemon = {
      height: data.height,
      isFavourite: false,
      id: data.id,
      name: data.name,
      avatar: data.sprites.back_default,
      types: data.types[0].type.name,
      weight: data.weight,
      user: null,
    };
    return pokemon;
  }

  async savePokemonInDB(item: PokemonDto): Promise<void> {
    const pokemon = new this.pokemonModel(item);
    return pokemon.save();
  }
}
