import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography, TextField, Button, Select, FormControl, InputLabel, MenuItem  } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from "@material-ui/icons/Search";

import useStyles from '../styles/pokemonliststyle';
import toFirstCharUppercase from "../util/formatter";

const PokemonList = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");
    const [filterOption, setFilterOption] = useState("");

    useEffect(() => {
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=500';
        axios.get(`${apiUrl}`)
        .then((response) => {
            const {data} = response;
            const {results} = data;
            const newPokemonData = {};
            results.forEach((pokemon, index) => {
                newPokemonData[index+1] = {
                    id: index+1,
                    name: pokemon.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
                }
            })
            setPokemonData(newPokemonData)
        })
       
    },[filterOption])

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterChange = (event) => {
    
  };

    const getPokemonCard = (pokemonId) => {
        const {id, name, sprite} = pokemonData[pokemonId];
        return (
            <Grid item xs={12} sm={4} key={pokemonId}>
                <Card onClick ={() => navigate(`/${pokemonId}`)}>
                    <CardMedia className={classes.cardMedia} image = {sprite} style={{height: "130px", width:"130px"}}/>
                    <CardContent className={classes.cardContent}>   
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )

    }

    return (
        <>
        <AppBar position = "static">
        <Toolbar>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Search your favourite Pokemon"
              variant="standard"
            />
          </div>
          <Button color="inherit" className={classes.bookmarkButtom} onClick={() => navigate("/bookmark")}>Bookmark</Button>
        </Toolbar>
        </AppBar>
        {pokemonData? (<>
        <div style={{paddingLeft: "570px", width: "600px"}}>
        <FormControl fullWidth style={{width:"200px"}}>
        <InputLabel id="demo-simple-select-standard-label">Filter By</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filterOption}
          label="Age"
          onChange={handleFilterChange}
        >
          <MenuItem value={10}>Ability</MenuItem>
          <MenuItem value={20}>Characteristic</MenuItem>
          <MenuItem value={30}>Group</MenuItem>
          <MenuItem value={10}>Habitat</MenuItem>
          <MenuItem value={20}>Location</MenuItem>
          <MenuItem value={30}>Species</MenuItem>
        </Select>
      </FormControl>
        </div>
        <Grid container spacing = {2} className={classes.pokedexContainer}>
            {Object.keys(pokemonData).map((pokemonId) => 
             pokemonData[pokemonId].name.includes(filter) &&
            getPokemonCard(pokemonId))}
        </Grid></>) : (<CircularProgress style={{margin: "auto", width: "600px"}}/>)}
        </>
    )

}

export default PokemonList