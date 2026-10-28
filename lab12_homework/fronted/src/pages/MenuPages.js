import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/containerCopy.css";

const API_MENU = "http://localhost:3000/api/menu";
const API_AUTH = "http://localhost:3000/authen";

function MenuPages() {
  const [food, setFood] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // null = Guest mode
  const [users, setUsers] = useState([]);
  const [adminView, setAdminView] = useState("menu"); // "menu" หรือ "user"
  const [ratings, setRatings] = useState({});

  // ฟอร์มเพิ่มเมนูใหม่สำหรับ Admin
  const [newMenu, setNewMenu] = useState({
    name: "",
    price: "",
    isBestSeller: true
  });

  const navigate = useNavigate();

  // 1. ตรวจสอบ JWT Token จาก localStorage
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCurrentUser(null);
      return;
    }
    try {
      const response = await axios.get(`${API_AUTH}/home`, {
        headers: { authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setCurrentUser(response.data.user[0]);
      } else {
        localStorage.removeItem("token");
        setCurrentUser(null);
      }
    } catch (err) {
      localStorage.removeItem("token");
      setCurrentUser(null);
    }
  };

  // 2. ดึงรายการอาหาร
  async function loadMenus() {
    try {
      const response = await axios.get(API_MENU);
      setFood(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  // 3. ดึงรายชื่อ User สำหรับ Admin
  async function loadUsers() {
    try {
      const response = await axios.get(`${API_AUTH}/users`);
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  // 4. useEffect โหลดข้อมูล + Real-time polling ทุก 5 วิ (สไลด์หน้า 39 & 54)
  useEffect(() => {
    checkAuth();
    loadMenus();

    const intervalId = setInterval(() => {
      loadMenus();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentUser?.role === "admin") {
      loadUsers();
    }
  }, [currentUser]);

  // Logout (สไลด์หน้า 40)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login");
  };

  // Admin ลบเมนู
  async function deleteItem(menuId) {
    try {
      await axios.delete(`${API_MENU}/${menuId}`);
      loadMenus();
    } catch (err) {
      alert("Delete failed");
    }
  }

  // Admin เพิ่มเมนูใหม่
  async function handleAddMenu(e) {
    e.preventDefault();
    if (!newMenu.name || !newMenu.price) return;
    try {
      await axios.post(API_MENU, {
        name: newMenu.name,
        price: Number(newMenu.price),
        isBestSeller: newMenu.isBestSeller === "BestSeller" || newMenu.isBestSeller === true
      });
      setNewMenu({ name: "", price: "", isBestSeller: true });
      loadMenus();
    } catch (err) {
      alert("Add menu failed");
    }
  }

  // Admin เปลี่ยน Role ผู้ใช้
  async function handleRoleChange(userId, newRole) {
    try {
      await axios.put(`${API_AUTH}/users/${userId}/role`, { role: newRole });
      loadUsers();
    } catch (err) {
      alert("Change role failed");
    }
  }

  return (
    <div style={{ maxWidth: "650px", margin: "20px auto", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden", fontFamily: "sans-serif" }}>
      {/* ส่วนหัวแสดงสถานะ User / ปุ่ม Login / Logout */}
      <div style={{ backgroundColor: "#fbe8d3", padding: "12px 20px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px" }}>
        {!currentUser ? (
          <button onClick={() => navigate("/login")} style={{ padding: "5px 15px", cursor: "pointer" }}>Login</button>
        ) : (
          <>
            <span><strong>{currentUser.userName}</strong> ({currentUser.role})</span>
            <button onClick={handleLogout} style={{ padding: "5px 15px", cursor: "pointer" }}>Logout</button>
          </>
        )}
      </div>

      <div style={{ padding: "20px" }}>
        {/* กรณี Admin: มีปุ่มสลับแท็บ user / menu (สไลด์หน้า 55) */}
        {currentUser?.role === "admin" && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
            <button
              onClick={() => setAdminView(adminView === "menu" ? "user" : "menu")}
              style={{ backgroundColor: "#a2e8dd", border: "1px solid #5cb8aa", padding: "5px 15px", cursor: "pointer", borderRadius: "4px" }}
            >
              {adminView === "menu" ? "user" : "menu"}
            </button>
          </div>
        )}

        {/* ถ้าอยู่ในโหมด Admin และเลือกดู User */}
        {currentUser?.role === "admin" && adminView === "user" ? (
          <div>
            <h2>User</h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {users.map((u) => (
                <li key={u.userId} style={{ margin: "10px 0" }}>
                  {u.userName} {u.email} &nbsp;
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.userId, e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* รายการ Our Menu (Guest / User / Admin) */
          <div>
            <h2>Our Menu</h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px", lineHeight: "2.2" }}>
              {food.map((item) => (
                <li key={item.menuId}>
                  {item.name} - {item.price} baht{" "}
                  {item.isBestSeller && <span title="Best Seller">🎖️</span>}{" "}
                  <span style={{ color: "#666" }}>
                    ({ratings[item.menuId] || "⭐ 4.0"})
                  </span>

                  {/* โหมด User: มี Dropdown ให้คะแนน Rating */}
                  {currentUser?.role === "user" && (
                    <span style={{ marginLeft: "10px", backgroundColor: "#99e9d9", padding: "2px 6px", borderRadius: "4px" }}>
                      Choose rating:{" "}
                      <select
                        value={ratings[item.menuId] || "5"}
                        onChange={(e) => setRatings({ ...ratings, [item.menuId]: `⭐ ${e.target.value}.0` })}
                      >
                        {[5, 4, 3, 2, 1].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </span>
                  )}

                  {/* โหมด Admin: มีปุ่ม Del สำหรับลบเมนู */}
                  {currentUser?.role === "admin" && (
                    <button
                      onClick={() => deleteItem(item.menuId)}
                      style={{ marginLeft: "10px", padding: "2px 8px", cursor: "pointer" }}
                    >
                      Del
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* โหมด Admin: มีฟอร์ม New Food สำหรับเพิ่มเมนู */}
            {currentUser?.role === "admin" && (
              <div style={{ marginTop: "30px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
                <h3>New Food</h3>
                <form onSubmit={handleAddMenu}>
                  <div style={{ marginBottom: "8px" }}>
                    <label>name : </label>
                    <input
                      type="text"
                      value={newMenu.name}
                      onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <label>price : </label>
                    <input
                      type="number"
                      value={newMenu.price}
                      onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <label>Best Seller : </label>
                    <select
                      value={newMenu.isBestSeller ? "BestSeller" : "Normal"}
                      onChange={(e) => setNewMenu({ ...newMenu, isBestSeller: e.target.value === "BestSeller" })}
                    >
                      <option value="BestSeller">BestSeller</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                  <button type="submit" style={{ padding: "4px 12px", cursor: "pointer" }}>
                    Add menu
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuPages;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import FoodList from "../components/FoodList";
// import FoodForm from "../components/FoodForm";
// import "../components/containerCopy.css";

// const API_URL = "http://localhost:3000/api/menu";

// function MenuPages() {
//   const [food, setFood] = useState([]);
//   const [editingFood, setEditingFood] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(
//     localStorage.getItem("mode") === "admin"
//   );

//   async function loadMenus() {
//     const response = await axios.get(API_URL);
//     setFood(response.data);
//   }

//   useEffect(() => {
//     loadMenus();
//   }, []);

//   function changeMode() {
//     const newStatus = !isAdmin;
//     setIsAdmin(newStatus);
//     localStorage.setItem("mode", newStatus ? "admin" : "user");
//   }

//   async function deleteItem(menuId) {
//     await axios.delete(`${API_URL}/${menuId}`);
//     loadMenus();
//   }

//   function startEdit(item) {
//     setEditingFood(item);
//   }

//   function cancelEdit() {
//     setEditingFood(null);
//   }

//   async function saveItem(item) {
//     if (editingFood) {
//       await axios.put(`${API_URL}/${editingFood.menuId}`, item);
//       setEditingFood(null);
//     } else {
//       await axios.post(API_URL, item);
//     }

//     loadMenus();
//   }

//   return (
//     <div className="container">
//       <h1 className="topic">Menu Page</h1>

//       <div className="mode">
//         <h2>{isAdmin ? "admin mode" : "user mode"}</h2>
//         <button onClick={changeMode}>{isAdmin ? "user" : "admin"}</button>
//       </div>

//       <FoodList
//         food={food}
//         del={deleteItem}
//         edit={startEdit}
//         isAdmin={isAdmin}
//       />

//       <hr style={{ margin: "10px" }} />

//       <FoodForm
//         saveItem={saveItem}
//         editingFood={editingFood}
//         cancelEdit={cancelEdit}
//         isAdmin={isAdmin}
//       />
//     </div>
//   );
// }

// export default MenuPages;
