import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
const RestaurantList = ({filterRestaurants}) => {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {filterRestaurants?.map((item) => (
        <Link to={"restaurant/" + item.info.id} key={item.info.id}>
          <RestaurantCard {...item.info} />
        </Link>
      ))}
    </div>
  );
};

export default RestaurantList;
