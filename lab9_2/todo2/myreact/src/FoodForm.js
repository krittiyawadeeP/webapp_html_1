import { useState } from "react";

const FoodForm = ({ onAddFood, addItem }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isBestSeller, setIsBestSeller] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !price) return;
        const addFn = onAddFood || addItem;
        if (addFn) {
            addFn({
                name: name.trim(),
                price: Number(price),
                isBestSeller: isBestSeller ? 1 : 0
            });
        }
        setName("");
        setPrice("");
        setIsBestSeller(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <h3>Add Food</h3>
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Food name"
                />
            </div>
            <div style={{ marginTop: "8px" }}>
                <label>Price: </label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />
            </div>
            <div style={{ marginTop: "8px" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={isBestSeller}
                        onChange={(e) => setIsBestSeller(e.target.checked)}
                    />
                    {" "}Best Seller
                </label>
            </div>
            <button type="submit" style={{ marginTop: "10px" }}>Add</button>
        </form>
    );
};

export default FoodForm;
// export { FoodForm, FoodForm as FoodFrom };
