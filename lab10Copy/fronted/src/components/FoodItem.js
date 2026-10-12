const FoodItem = ({ item, del, edit, isAdmin }) => {
    return (
        <li className={item.isBestSeller ? "reward" : ""}>
            <p>
                {item.name} | {item.price}
                {item.isBestSeller ? " best seller" : ""}
                {item.type ? ` | ${item.type.name}` : ""}

                {isAdmin && (
                    <>
                        <button onClick={() => edit(item)}>edit</button>
                        <button onClick={() => del(item.menuId)}>delete</button>
                    </>
                )}
            </p>
        </li>
    );
};

export default FoodItem;
