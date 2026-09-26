const FoodItem = ({ index, item, del }) => {
    return (
        <li>
            <p>{item.name} | {item.price}</p>
            <span>
                {item.isBestSeller ? "bestSeller" : ""}
            </span>

            <button onClick={() => del(index)}>
                delete
            </button>
        </li>
    );
};

export default FoodItem;
// export { FoodItem };