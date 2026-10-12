import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPages from "./pages/MenuPages";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
