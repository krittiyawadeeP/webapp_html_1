import { useEffect, useState } from "react";
import FoodList from "../components/FoodList";
import axios from "axios";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:3000/api/menu";

function HomePage() {
  const [food, setFood] = useState([]);
  // const [price,setPrice] =useState([]);


  async function loadListMenuBest() {
    const response = await axios.get(`${API_URL}/best`);
    setFood(response.data);

  }

  useEffect(() => {
    loadListMenuBest();
  }, []);


  return (
    <div>
      <h1>Welcome to our restaurant</h1>

      <section>
        <h2>About us</h2>
        <p>
          ร้านอาหารของเราให้บริการอาหารหลากหลายเมนู ใช้วัตถุดิบสดใหม่
          และพร้อมให้บริการทั้งรับประทานที่ร้านและสั่งกลับบ้าน
        </p>

      </section>

      <section>
        <h2 class="head">บรรยากาศและอาหาร</h2>

        <div class="gallery">

          <Link to={"/menu"}>
            {/* ถ้ามาจาก public เวลาเรียก path ใช้ "/" ขึันต้น */}
            <img src="/img/view1.jpg" alt="วิว 1" height="200"></img>
          </Link>

          <Link to={"/menu"}>
            <img src="/img/view2.jpg" alt="วิว 2" height="200"></img>
          </Link>

          <Link to={"/menu"}>
            <img src="/img/view3.jpg" alt="วิว 3" height="200"></img>
          </Link>

          <Link to={"/menu"}>
            <img src="/img/view4.jpg" alt="วิวิ 4" height="200"></img>
          </Link>
          
          <Link to={"/menu"}>
            <img src="/img/egg.jpg" alt="อาหาร 1" height="200"></img>
          </Link>

          <Link to={"/menu"}>
            <img src="/img/fryrice.jpg" alt="อาหาร 2" height="200"></img>
          </Link>

        </div>
      </section>

      <section>
        <h2>Recommended Menu</h2>
        <FoodList
          food={food}
        />

      </section>
    </div >


  );

}

export default HomePage;
