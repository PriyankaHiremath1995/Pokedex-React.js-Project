import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';

const PokemonDetails = (props) => {
    let params = useParams()
    let navigate = useNavigate()
    const {pokemonId} = params;
    const [pokemonData, setPokemonData] = useState(undefined);

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
        <>
            {pokemonData === undefined && <CircularProgress />}
            {pokemonData !== undefined && pokemonData && generatePokemonJSX()}
            {pokemonData === false && <Typography> Pokemon not found</Typography>}

            {pokemonData !== undefined && (
                 <Button variant="contained" onClick={() => navigate("/")}>Back to the list </Button>
      )}
        </>
    )

}

export default PokemonDetails