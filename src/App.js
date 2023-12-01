import {Route, BrowserRouter, Routes} from "react-router-dom";

import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
        <Routes>
      <Route exact path="/" element={<PokemonList />} />
      <Route exact path="/:pokemonId" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
