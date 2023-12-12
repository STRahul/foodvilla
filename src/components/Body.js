import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FETCH_RESTAURANT_URL } from "../constant";
import RestaurantCard from "./RestaurantCard";
import Search from "./search";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);

  useEffect(() => {
    getRestaurantData();
  }, []);

  async function getRestaurantData() {
    const data = await fetch(FETCH_RESTAURANT_URL);
    const jsonData = await data.json();
    setRestaurants(
      jsonData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilterRestaurants(
      jsonData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  }

  const filterData = (searchText) => {
    const data = restaurants?.filter((item) =>
      item.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterRestaurants(data);
  };

  if (restaurants?.length === 0) {
    return <Shimmer />;
  }

  return (
    <>
      <Search onFilterData={filterData} />
      <div className="overflow-x-hidden">
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {filterRestaurants?.map((item) => (
            <Link to={"restaurant/" + item.info.id} key={item.info.id}>
              <RestaurantCard {...item.info} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Body;
