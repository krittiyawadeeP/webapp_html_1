const FoodItem = ({ index, item, del }) => {
    return (
        <li>
            <p>{item.name} | {item.price}
                {item.isBestSeller ? "🏆" : ""}
                <button onClick={() => del(index)}>
                    delete
                </button>
            </p>
        </li>
    );
};

export default FoodItem;
// export { FoodItem };