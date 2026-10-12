import { useEffect, useState } from "react";
import axios from "axios";
import FoodList from "../components/FoodList";
import FoodForm from "../components/FoodForm";
import "../components/containerCopy.css";

const API_URL = "http://localhost:3000/api/menu";

function MenuPages() {
  const [food, setFood] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("mode") === "admin"
  );

  async function loadMenus() {
    const response = await axios.get(API_URL);
    setFood(response.data);
  }

  useEffect(() => {
    loadMenus();
  }, []);

  function changeMode() {
    const newStatus = !isAdmin;
    setIsAdmin(newStatus);
    localStorage.setItem("mode", newStatus ? "admin" : "user");
  }

  async function deleteItem(menuId) {
    await axios.delete(`${API_URL}/${menuId}`);
    loadMenus();
  }

  function startEdit(item) {
    setEditingFood(item);
  }

  function cancelEdit() {
    setEditingFood(null);
  }

  async function saveItem(item) {
    if (editingFood) {
      await axios.put(`${API_URL}/${editingFood.menuId}`, item);
      setEditingFood(null);
    } else {
      await axios.post(API_URL, item);
    }

    loadMenus();
  }

  return (
    <div className="container">
      <h1 className="topic">Menu Page</h1>

      <div className="mode">
        <h2>{isAdmin ? "admin mode" : "user mode"}</h2>
        <button onClick={changeMode}>{isAdmin ? "user" : "admin"}</button>
      </div>

      <FoodList
        food={food}
        del={deleteItem}
        edit={startEdit}
        isAdmin={isAdmin}
      />

      <hr style={{ margin: "10px" }} />

      <FoodForm
        saveItem={saveItem}
        editingFood={editingFood}
        cancelEdit={cancelEdit}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default MenuPages;
