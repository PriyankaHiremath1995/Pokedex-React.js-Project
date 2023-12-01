import React from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent } from '@material-ui/core';

import useStyles from '../styles/pokemonliststyle';

const PokemonList = () => {
    const classes = useStyles();

    const getPokemonCard = () => {
        return (
            <>
            <Grid item xs={12} sm={4}>
                <Card>
                    <CardContent>Hi</CardContent>
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
        <Grid container spacing = {2} className={classes.pokedexContainer}>
            {getPokemonCard()}
        </Grid>
        </>
    )

}

export default PokemonList