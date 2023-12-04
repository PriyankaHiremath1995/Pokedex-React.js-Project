import React, { useState, useEffect } from 'react';
import {Grid, Card, CardContent, CircularProgress, CardMedia, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from '../styles/pokemonliststyle';
import toFirstCharUppercase from "../util/formatter";

const PokemonBookmarked = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookmarks = () => {
          const bookmarkedPokemons = Object.entries(localStorage)
            .map(([key, value]) => {
              let parsedPokemon;
              try {
                parsedPokemon = JSON.parse(value);
                console.log("parsedPokemon",parsedPokemon)
                if (parsedPokemon) {
                  return {
                    id: parsedPokemon.id,
                    name: parsedPokemon.name,
                    abilities: parsedPokemon.abilities,
                    types: parsedPokemon.types,
                    image: parsedPokemon.sprites.other["official-artwork"].front_default,
                  };
                } else {
                  console.error(`Invalid bookmarked Pokémon ${key}`);
                  return null;
                }
              } catch (error) {
                console.error(`Error parsing bookmarked Pokémon ${key}:`, error);
                return null;
              }
            })
            .filter((pokemon) => pokemon !== null);
        
          setBookmarks(bookmarkedPokemons);
          console.log("bookmarks",bookmarks)
        };
        
        fetchBookmarks();
      }, []);

      const handleRemoveBookmark = (pokemonName) => {
        localStorage.removeItem(pokemonName);
        setBookmarks((prevBookmarks) =>
          prevBookmarks.filter((pokemon) => pokemon.name !== pokemonName)
        );
      };

    const getPokemonCard = (pokemonId) => {
        console.log("pokemonId",pokemonId)
        const {id, name, image} = pokemonId;
        return (
            <Grid item xs={12} sm={4} key={pokemonId}>
                <Card>
                <DeleteIcon style={{paddingLeft: "380px", paddingTop: "5px"}} onClick={() => handleRemoveBookmark(name)}/>
                    <CardMedia className={classes.cardMedia} image = {image} style={{height: "130px", width:"130px"}}/>
                    <CardContent className={classes.cardContent}>   
            <Typography onClick ={() => navigate(`/${id}`)}>{`${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )

    }

    return (
    <>
    {bookmarks? (<><Grid container spacing = {2} className={classes.pokedexContainer}>
            {bookmarks.map((pokemonId) => 
            getPokemonCard(pokemonId))}
        </Grid>
        <div style={{paddingTop: "20px", paddingLeft: "600px", paddingBottom: "20px"}}>
         <Button variant="contained" onClick={() => navigate("/")}>Back to the list </Button>
         </div>
         </>
  ) : (<CircularProgress/>)}
    </>)
}

export default PokemonBookmarked