import { useState, useEffect } from "react";
import { FETCH_RESTAURANT_URL, MOB_REST_API } from "../constant";
import Search from "./search";
import Shimmer from "./Shimmer";
import Carousel from "./Carousel";
import Dropdown from "./Dropdown";
import RestaurantList from "./RestaurantList";
import { useMediaQuery } from "react-responsive";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [cards, setCards] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [applyVeg, setApplyVeg] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  useEffect(() => {
    if (isMobile) {
      getRestaurantData(MOB_REST_API);
    } else {
      getRestaurantData(FETCH_RESTAURANT_URL);
    }
  }, []);

  async function getRestaurantData(url) {
    const data = await fetch(url);
    const jsonData = await data.json();
    setCards(jsonData?.data?.cards);
    setRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilterRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  }

  const filterData = (searchText) => {
    const data = restaurants?.filter((item) =>
      item.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterRestaurants(data);
  };

  const sortRestaurants = (searchBy) => {
    const data = filterRestaurants.toSorted((a, b) => {
      setShowDropdown(false);
      if (searchBy === "rating")
        return parseFloat(b.info.avgRating) - parseFloat(a.info.avgRating);
      else
        return (
          parseFloat(a.info.sla.deliveryTime) -
          parseFloat(b.info.sla.deliveryTime)
        );
    });
    setFilterRestaurants(data);
  };

  function filterVegRestaurant() {
    const data = !applyVeg
      ? filterRestaurants.filter((res) => res?.info?.veg)
      : restaurants;
    setFilterRestaurants(data);
    setApplyVeg(!applyVeg);
  }

  if (restaurants?.length === 0) {
    return <Shimmer />;
  }
  return (
    <>
      <div className="overflow-x-hidden max-w-[1280px] mx-auto mb-20 [&::-webkit-scrollbar]:hidden">
        {cards && (
          <Carousel
            label={cards[0]?.card?.card?.header?.title}
            data={cards[0]?.card?.card?.imageGridCards}
          />
        )}

        <hr className="border border-[rgb(240,240,245)] my-3 mx-2" />

        {cards && (
          <h1 className="font-bold text-2xl ml-3 p-2">
            {cards[2]?.card?.card?.title}
          </h1>
        )}
        <Search onFilterData={filterData} />
        <div className="relative inline-block mx-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="border-2 border-gray-400 text-gray-700 font-medium rounded-full text-lg px-5 py-1 text-center inline-flex items-center"
            type="button"
            onClick={() => setShowDropdown((prevState) => !prevState)}>
            Sort By
          </button>
          <Dropdown
            showDropdown={showDropdown}
            sortRestaurants={sortRestaurants}
          />
        </div>
        <button
          className={`border-2 border-gray-400 text-gray-700 font-medium rounded-full text-lg px-5 py-1 text-center inline-flex items-center mx-3 ${
            applyVeg ? "bg-gray-200" : ""
          }`}
          onClick={filterVegRestaurant}>
          Pure Veg {applyVeg && "X"}
        </button>
        <RestaurantList filterRestaurants={filterRestaurants} />
      </div>
    </>
  );
};

export default Body;
