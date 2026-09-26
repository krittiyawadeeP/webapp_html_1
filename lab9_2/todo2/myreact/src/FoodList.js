import FoodItem from "./FoodItem";

const FoodList = ({ food, del }) => {
    return (
        <div>
            <ul>
                {/* food.map(...): เป็นการสั่งให้เวียนอ่านข้อมูลในอาร์เรย์ food ตั้งแต่ตัวแรกจนถึงตัวสุดท้าย
                item, index) => (...): ในแต่ละรอบที่ลูป จะดึงข้อมูลอาหารตัวนั้นมาเก็บในตัวแปร item และเอาตำแหน่งของมันมาเก็บในตัวแปร index (เริ่มจาก 0, 1, 2...) */}
                {food.map((eachItem, index) => (
                    <FoodItem
                        index={index}
                        key={index}
                        item={eachItem}
                        del={del}
                    />
                ))}
            </ul>
        </div>
    );
};

export default FoodList;
export { FoodList };