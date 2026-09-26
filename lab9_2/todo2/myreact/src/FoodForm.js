import { useState } from "react";

const FoodForm = ({ addItem, isAdmin }) => {
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        isBestSeller: "1"
    });

    function handleSubmit(e) {
        e.preventDefault();

        // ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่ก่อนเพิ่ม
        if (!inputs.name.trim() || !inputs.price) {
            return;
        }

        const newFood = {
            name: inputs.name.trim(),
            price: Number(inputs.price),
            isBestSeller: inputs.isBestSeller === "1" ? 1 : 0
        };

        if (addItem) {
            addItem(newFood);
        }

        // เคลียร์ฟอร์มหลังเพิ่มเมนูสำเร็จ
        setInputs({
            name: "",
            price: "",
            isBestSeller: "1"
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div>
            {isAdmin && (
                <form onSubmit={handleSubmit}>
                    <h2>newFood</h2>
                    <p>name : </p>
                    <input
                        value={inputs.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        placeholder="Food name"
                        required
                    />

                    <p>price : </p>
                    {/* แก้ไข tag input ให้เป็น self-closing เพื่อไม่ให้เกิด error ใน React */}
                    <input
                        value={inputs.price}
                        onChange={handleChange}
                        type="number"
                        name="price"
                        placeholder="Price"
                        required
                    />

                    <div style={{ marginTop: "10px" }}>
                        <select
                            name="isBestSeller"
                            value={inputs.isBestSeller}
                            onChange={handleChange}
                        >
                            <option value="1">best seller</option>
                            <option value="0">normal</option>
                        </select>
                    </div>

                    <button type="submit" style={{ marginTop: "10px" }}>
                        Add menu
                    </button>
                </form>
            )}
        </div>
    );
};

export default FoodForm;
export { FoodForm };