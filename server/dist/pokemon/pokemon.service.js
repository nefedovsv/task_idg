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
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const node_fetch_1 = require("node-fetch");
const keys_1 = require("./config/keys");
const POKEMONS_AMOUNT = 50;
let PokemonService = class PokemonService {
    constructor(pokemonModel) {
        this.pokemonModel = pokemonModel;
    }
    async find() {
        return await this.pokemonModel.find({ isFavourite: false, user: null });
    }
    async findFavourite(email) {
        return await this.pokemonModel.find({ isFavourite: true, user: email });
    }
    async update(pokemon, email) {
        const favourite = await this.pokemonModel.find({
            id: pokemon.id,
            user: email,
        });
        if (!favourite.length) {
            const favorite = Object.assign({}, pokemon, { isFavourite: true, user: email });
            delete favorite._id;
            await this.savePokemonInDB(favorite);
            return;
        }
        return;
    }
    async deleteFavourite(id) {
        return this.pokemonModel.findByIdAndDelete(id);
    }
    async createDB() {
        const pokemonsList = await this.getPokemonsList();
        const namesFromDB = await this.getPokemonNamesFromDB();
        const loadList = this.pokemonfilter(pokemonsList, namesFromDB);
        for (const item of loadList) {
            const pokemon = await this.loadPokemon(item);
            this.savePokemonInDB(pokemon);
        }
        return console.log('DB was created');
    }
    async getPokemonsList() {
        let needToLoad = true;
        let pageNumber = 0;
        const pokemonList = [];
        while (needToLoad) {
            const page = await this.getPokemonsPage(pageNumber);
            pageNumber++;
            if (page.next) {
                pokemonList.push(...page.results);
            }
            else {
                needToLoad = false;
            }
        }
        return pokemonList;
    }
    async getPokemonsPage(pageNumber) {
        const url = `${keys_1.baseUrl}?offset=${pageNumber *
            POKEMONS_AMOUNT}&limit=${POKEMONS_AMOUNT}`;
        const response = await node_fetch_1.default(url);
        return response.json();
    }
    async getPokemonNamesFromDB() {
        const namesFromDB = await this.pokemonModel.find({}, { name: 1 });
        return namesFromDB.map(item => item.name);
    }
    pokemonfilter(pokemonsList, namesFromDB) {
        return pokemonsList.filter(item => !namesFromDB.includes(item.name));
    }
    async loadPokemon(pokemonData) {
        const response = await node_fetch_1.default(pokemonData.url);
        const data = await response.json();
        const pokemon = {
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
    async savePokemonInDB(item) {
        const pokemon = new this.pokemonModel(item);
        return pokemon.save();
    }
};
PokemonService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Pokemon')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], PokemonService);
exports.PokemonService = PokemonService;
//# sourceMappingURL=pokemon.service.js.map