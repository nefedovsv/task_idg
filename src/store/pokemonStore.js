import { observable, action, runInAction, decorate } from "mobx";
import { baseUrl } from "../utils/constants";

export class PokemonStore {
  pokemons = [];
  sortedPokemons = [];

  getPokemons = async () => {
    try {
      const response = await fetch(baseUrl + "pokemons", this.getHeader());
      const data = await response.json();
      runInAction(() => {
        this.pokemons = data;
      });
    } catch (error) {
      runInAction(() => {
        this.pokemons = [];
      });
    }
  };

  search = (value = null, property = null) => {
    try {
      runInAction(() => {
        value
          ? (this.sortedPokemons = this.pokemons.filter(item =>
              property === "name" ? item.name === value : item.types === value
            ))
          : (this.sortedPokemons = this.pokemons);
      });
    } catch {
      runInAction(() => {
        this.pokemons = [];
      });
    }
  };

  setFavourite = (item, email) => {
    try {
      fetch(baseUrl + "favourite", {
        method: "PUT",
        ...this.getHeader(),
        body: JSON.stringify({
          favourite: item,
          email: email
        })
      });
    } catch {
      this.pokemons = [];
    }
  };

  deleteFavourite = (item, email) => {
    try {
      fetch(baseUrl + "favourite" + item._id, {
        method: "DELETE",
        ...this.getHeader()
      });
    } catch {
      this.pokemons = [];
    }
  };

  getFavouritePokemons = async email => {
    try {
      const response = await fetch(baseUrl + "favouritePokemons", {
        ...this.getHeader(email)
      });
      const data = await response.json();
      runInAction(() => {
        this.pokemons = data;
      });
    } catch (error) {
      runInAction(() => {
        this.pokemons = [];
      });
    }
  };

  getHeader = (data = null) => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
      userData: data
    }
  });
}

decorate(PokemonStore, {
  pokemons: observable,
  sortedPokemons: observable,
  getAllTodo: action,
  search: action,
  setFavorite: action,
  getFavouritePokemons: action
});
