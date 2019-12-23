export class PokemonDto {
  readonly height: number;
  readonly isFavourite: boolean;
  readonly id: number;
  readonly name?: string;
  readonly avatar: string;
  readonly types: string;
  readonly weight: number;
  readonly user?: string;
  // tslint:disable-next-line:variable-name
  readonly _id?: string;
}
