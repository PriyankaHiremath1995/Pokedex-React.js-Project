import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import data from "../data/mockData";
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';

const PokemonDetails = (props) => {
    let params = useParams()
    const {pokemonId} = params;
    const [pokemonData, setPokemonData] = useState(data[`${pokemonId}`]);

    const toFirstCharUppercase = name =>
  name.charAt(0).toUpperCase() + name.slice(1);

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites } = pokemonData;
        const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        const { front_default } = sprites;
        return(
            <>
        <Typography variant="h1">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name} </Link>
        </Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <Typography variant="h6"> Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}> {`${name}`}</Typography>;
        })}
      </>
        )
    }

    return (
        <div>{generatePokemonJSX()}</div>
    )

}

export default PokemonDetails