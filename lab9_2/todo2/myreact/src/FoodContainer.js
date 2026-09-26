import { useState } from "react";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import './container.css';

// กำหนดทุกอย่างก่อน export ก็ได้มั้ง
const FoodContainer = () => {
    const foods = [
        { name: "cake", price: 35, isBestSeller: 1 },
        { name: "bread", price: 25, isBestSeller: 0 }
    ];

    const [food, setfood] = useState(foods);

    const deleteItem = (index) => {
        const leftFood = food.filter((eachFood, i) => i !== index);
        setfood(leftFood);
    };

    const addItem = (newItem) => {
        // ...food คือ การแกะกล่องเอาข้อมูลอาหาร"ทุกตัวที่มีอยู่เดิม" ออกมากางไว้ก่อน
        setfood([...food, newItem]);
    };

    return (
        <div className="container">
            <h1>our menu</h1>
            {/* food.filter(...): เป็นการวนลูปเพื่อกรองข้อมูลในอาร์เรย์ food โดยจะสร้างอาร์เรย์ใหม่ขึ้นมา (newFood) ที่มีเฉพาะรายการที่ผ่านเงื่อนไข */}
            <FoodList food={food} del={deleteItem} />
            <hr style ={{ margin:"10px" }} ></hr>
            <FoodForm addItem={addItem} onAddFood={addItem} />
            
        </div>
    );
};
export default FoodContainer;
export { FoodContainer };