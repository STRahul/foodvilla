import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FETCH_RESTAURANT_URL } from "../constant";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [searchText, setSearcgText] = useState("");
 
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

  const filterData = () => {
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
      <div className="p-3 mt-2 bg-white shadow-md">
        <input
          className=" ml-3 p-1 px-2 border border-sky-200 focus:border-green-600 focus:bg-blue-100 outline-none"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearcgText(e.target.value)}
        />
        <button
          className="bg-blue-500 ml-3 px-4 py-1 text-xl text-white rounded-md"
          onClick={filterData}
        >
          Search
        </button>
      </div>
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
