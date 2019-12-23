import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import config from './pokemon/config/keys';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    PokemonModule,
    AuthModule,
    MongooseModule.forRoot(config.mongoURI, { useNewUrlParser: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'build'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
