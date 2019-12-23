import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { PokemonsList } from "./PokemonsList";
import { Input } from "antd";
import { Filter } from "./Filter";
import styles from "../index.module.css";
import { useAuth0 } from "../utils/react-auth0-spa";
import { store } from "../utils/constants";

const { Search } = Input;

export const Home = inject(store)(
  observer(({ pokemonStore }) => {
    const {
      getPokemons,
      setFavourite,
      pokemons,
      sortedPokemons,
      search
    } = pokemonStore;

    const { getTokenSilently } = useAuth0();
    const current = sortedPokemons.length ? sortedPokemons : pokemons;

    useEffect(() => {
      const getToken = async () => {
        const token = await getTokenSilently();
        localStorage.setItem("token", token);
        return;
      };
      getToken();
    }, [getTokenSilently]);

    useEffect(() => {
      getPokemons();
    }, [getPokemons]);

    return (
      <div>
        <div className={styles.filter}>
          <Filter search={search} />
          <Search
            style={{ width: 350 }}
            onSearch={value => search(value, "name")}
            enterButton
          />
        </div>

        <PokemonsList
          search={search}
          pokemons={current}
          handleClick={setFavourite}
        />
      </div>
    );
  })
);
