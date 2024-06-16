import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home.jsx";
import { Auth } from "./pages/auth.jsx";
import { CreateRecipe } from "./pages/create-recipe.jsx";
import { SaveRecipe } from "./pages/save-recipe.jsx";
import { Navbar } from "./components/navbar.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/save-recipe" element={<SaveRecipe />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
