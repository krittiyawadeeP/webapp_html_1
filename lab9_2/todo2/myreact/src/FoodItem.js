const FoodItem = ({ index, item, del ,isAdmin}) => {
    return (
        <li>
            <p>{item.name} | {item.price}
                {item.isBestSeller ? "🏆" : ""}
                { isAdmin && (<button onClick={() => del(index)}>
                    delete
                </button>)}
            </p>
        </li>
    );
};

export default FoodItem;
// export { FoodItem };