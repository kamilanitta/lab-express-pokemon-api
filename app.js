const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

app.get("/pokemon", (request, response) => {
  //   console.log("test get");
  return response.json(allPokemon);
});

app.get("/pokemon/search", (request, response) => {
  //   response.send(request.query);
  const queryParams = response.query;
  console.log(queryParams);

  for (let key in queryParams) {
    const foundPokemon = allPokemon.find((pokemon) => {
      return pokemon[key]
        .toLowerCase()
        .includes(queryParams[key].toLowerCase());
    });
    if (foundPokemon) {
      return response.json(foundPokemon);
    } else {
      return response.json({ msg: "Pokemon not found" });
    }
  }
  response.json(queryParams);
});

app.get("/pokemon/:id", (request, response) => {
  const id = request.params.id;

  const foundPokemon = allPokemon.find((pokemon) => {
    return pokemon.id === Number(id);
  });
  //   console.log(foundPokemon);
  return response.json(foundPokemon);
});

// -- Define your route listeners here! --

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
