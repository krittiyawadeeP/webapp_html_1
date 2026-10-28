import { useEffect, useState } from "react";

const FoodForm = ({ saveItem, editingFood, cancelEdit, isAdmin }) => {
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        isBestSeller: "1",
        typeId: "1"
    });

    useEffect(() => {
        if (editingFood) {
            setInputs({
                name: editingFood.name || "",
                price: editingFood.price || "",
                isBestSeller: editingFood.isBestSeller ? "1" : "0",
                typeId: editingFood.typeId ? String(editingFood.typeId) : "1"
            });
        }
    }, [editingFood]);

    async function handleSubmit(e) {
        e.preventDefault();

        // ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่ก่อนเพิ่ม
        if (!inputs.name.trim() || !inputs.price) {
            return;
        }

        const newFood = {
            name: inputs.name.trim(),
            price: Number(inputs.price),
            isBestSeller: inputs.isBestSeller === "1",
            typeId: Number(inputs.typeId)
        };

        if (saveItem) {
            await saveItem(newFood);
        }

        // เคลียร์ฟอร์มหลังเพิ่มเมนูสำเร็จ
        setInputs({
            name: "",
            price: "",
            isBestSeller: "1",
            typeId: "1"
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
                    <h2>{editingFood ? "editFood" : "newFood"}</h2>
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

                    <p>type : </p>
                    <select
                        name="typeId"
                        value={inputs.typeId}
                        onChange={handleChange}
                    >
                        <option value="1">food</option>
                        <option value="2">drink</option>
                        <option value="3">dessert</option>
                    </select>

                    <button type="submit" style={{ marginTop: "10px" }}>
                        {editingFood ? "Update menu" : "Add menu"}
                    </button>

                    {editingFood && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            )}
        </div>
    );
};

export default FoodForm;
export { FoodForm };
