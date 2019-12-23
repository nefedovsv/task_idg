import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { DBService } from './createDB.service';
import { PokemonSchema } from './schemas/pokemon.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService, DBService],
})
export class PokemonModule {}
