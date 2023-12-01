import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import useStyles from '../styles/pokemonliststyle';
import data from "../data/mockData";

const PokemonList = (props) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [pokemonData, setPokemonData] = useState(data)

    const toFirstCharUppercase = name =>
  name.charAt(0).toUpperCase() + name.slice(1);

    const getPokemonCard = (pokemonId) => {
        const {id, name} = pokemonData[`${pokemonId}`]
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        return (
            <>
            <Grid item xs={12} sm={4} key={pokemonId}>
                <Card onClick ={() => navigate(`/${pokemonId}`)}>
                    <CardMedia className={classes.cardMedia} image = {sprite} style={{height: "130px", width:"130px"}}/>
                    <CardContent className={classes.cardContent}>   
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
</>
        )

    }

    return (
        <>
        <AppBar position = "static">
            <Toolbar/>
        </AppBar>
        {pokemonData? (<Grid container spacing = {2} className={classes.pokedexContainer}>
            {Object.keys(pokemonData).map((pokemonId) => getPokemonCard(pokemonId))}
        </Grid>) : (<CircularProgress/>)}
        </>
    )

}

export default PokemonList