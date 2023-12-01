import React from 'react';
import { useParams } from "react-router-dom"

const DetailsPage = (props) => {
    let params = useParams()
    const {pokemonId} = params;

    return (
        <div>{`Pokemon details page of ${pokemonId}`}</div>
    )

}

export default DetailsPage