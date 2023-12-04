import {Route, BrowserRouter, Routes} from "react-router-dom";

import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import PokemonBookmarked from './components/PokemonBookmarked';

function App() {
  return (
    <BrowserRouter>
        <Routes>
      <Route exact path="/" element={<PokemonList />} />
      <Route exact path="/:pokemonId" element={<PokemonDetails />} />
      <Route exact path="/bookmark" element={<PokemonBookmarked />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
