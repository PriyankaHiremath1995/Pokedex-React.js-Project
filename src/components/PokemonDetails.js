import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Typography, IconButton, CircularProgress, Button, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from 'axios';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {Alert} from 'reactstrap';

import toFirstCharUppercase from "../util/formatter";

const PokemonDetails = () => {
    let navigate = useNavigate()
    let params = useParams()
    const {pokemonId} = params;

    const [pokemonData, setPokemonData] = useState(undefined);
    const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemonData(data);
        checkBookmarkStatus(data.name)
      })
      .catch(function (error) {
        setPokemonData(false);
      });
  }, [pokemonId]);

  const checkBookmarkStatus = (name) => {
    const isPokemonBookmarked = localStorage.getItem(name);
    setIsBookmarked(!!isPokemonBookmarked);
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem(pokemonData.name);
      setIsBookmarked(false);
     return (
        <Alert color="warning" style={{ width: '100%' }}>
        `${pokemonData.name} removed from bookmark`
        </Alert>)
    } else {
      const pokemon= JSON.stringify(pokemonData);
      localStorage.setItem(pokemonData.name, pokemon);
      setIsBookmarked(true);
      return (
        <Alert color="success" style={{ width: '100%' }}>
        `${pokemonData.name} removed from bookmark`
        </Alert>)
        
    }
    
  };

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types } = pokemonData;
        const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

      return (
        <div style={{margin: "auto", width: "600px"}}> 
        <Typography variant="h2" style={{paddingTop: "40px", paddingLeft: "150px"}}>{toFirstCharUppercase(name)}</Typography>
        <img style={{ width: "300px", height: "250px", paddingLeft: "140px" }} src={fullImageUrl} />
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Species</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Weight</TableCell>
              {types.map((typeInfo) => {
                const { slot } = typeInfo;
                return <TableCell>Type {slot}</TableCell>
              })}
            </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
              <TableCell>{species.name}</TableCell>
              <TableCell>{height}</TableCell>
              <TableCell>{weight}</TableCell>
              {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return <TableCell>{name}</TableCell>
              })}
            </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{paddingTop: "20px", paddingLeft: "200px"}}>
      <Button variant="contained" onClick={() => navigate("/")}>Back to the list </Button>
      <IconButton onClick={handleBookmark}>{
            isBookmarked ? (
              <BookmarkIcon size={24}/>
            ) : (
              <BookmarkBorderIcon size={24}/>
            )
          }
    </IconButton>
      </div>
      </div>
      )
    }

    return (
        <>
            {pokemonData === undefined && <CircularProgress />}
            {pokemonData !== undefined && pokemonData && generatePokemonJSX()}
            {pokemonData === false && <Typography> Pokemon not found</Typography>}
        </>
    )

}

export default PokemonDetails