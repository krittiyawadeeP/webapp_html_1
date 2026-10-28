import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPages from "./pages/MenuPages";
// 1. เพิ่ม import 2 บรรทัดนี้
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/Home" element={<MenuPages />} />
        <Route path="/menu" element={<MenuPages />} />

        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
