import { Injectable, OnModuleInit } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Injectable()
export class DBService implements OnModuleInit {
  constructor(private readonly pokemonService: PokemonService) {}
  onModuleInit() {
    this.pokemonService.createDB();
  }
}
