import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useAuth0 } from "../utils/react-auth0-spa";
import { PokemonsList } from "./PokemonsList";
import { store } from "../utils/constants";

export const Favourite = inject(store)(
  observer(({ pokemonStore }) => {
    const { getFavouritePokemons, pokemons, deleteFavourite } = pokemonStore;
    const { user } = useAuth0();
    const token = localStorage.getItem("token");

    if (token) {
      useEffect(() => {
        getFavouritePokemons(user.email);
      }, [getFavouritePokemons, pokemons, user.email]);
    }

    return <PokemonsList pokemons={pokemons} handleClick={deleteFavourite} />;
  })
);
