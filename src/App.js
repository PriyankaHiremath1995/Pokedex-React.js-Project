import {Route, BrowserRouter, Routes} from "react-router-dom";

import Grid from "./Grid";
import DetailsPage from "./DetailsPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
      <Route exact path="/" element={<Grid />} />
      <Route exact path="/:pokemonId" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
