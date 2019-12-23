import {
  Controller,
  Param,
  Body,
  Get,
  Delete,
  Put,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { AuthGuard } from '@nestjs/passport';
import { Pokemon } from './interfaces/pokemon.interface';

@Controller('api')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('pokemons')
  find(): Promise<Pokemon[]> {
    return this.pokemonService.find();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('favouritePokemons')
  findFavourite(@Headers('userdata') email: any): Promise<Pokemon[]> {
    return this.pokemonService.findFavourite(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('favourite')
  update(
    @Body('favourite')
    favourite: Pokemon,
    @Body('email') email: string,
  ): Promise<void> {
    return this.pokemonService.update(favourite, email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('favourite:id')
  deleteFavourite(@Param('id') id: string): Promise<void> {
    return this.pokemonService.deleteFavourite(id);
  }
}
