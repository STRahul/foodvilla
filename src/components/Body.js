import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FETCH_RESTAURANT_URL } from "../constant";
import RestaurantCard from "./RestaurantCard";
import Search from "./search";
import Shimmer from "./Shimmer";
import Carousel from "./Carousel";
import Dropdown from "./Dropdown";

const image_cdn =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";
const discount_image_cdn =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [cards, setCards] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    getRestaurantData();
  }, []);

  async function getRestaurantData() {
    const data = await fetch(FETCH_RESTAURANT_URL);
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
    const data = filterRestaurants.toSorted(
      (a, b) => {
        setShowDropdown(false);
        if(searchBy==='rating')
         return parseFloat(b.info.avgRating) - parseFloat(a.info.avgRating)
        else
        return parseFloat(a.info.sla.deliveryTime) - parseFloat(b.info.sla.deliveryTime)
      }
    );
    setFilterRestaurants(data);
  };

  if (restaurants?.length === 0) {
    return <Shimmer />;
  }
  return (
    <>
      <div className="overflow-x-hidden max-w-[1280px] mx-auto [&::-webkit-scrollbar]:hidden">
        {cards && (
          <>
            <Carousel
              label="Best offers for you"
              image_cdn={discount_image_cdn}
              data={cards[1]?.card?.card?.imageGridCards}
            />
            <Carousel
              customStyle={true}
              image_cdn={image_cdn}
              label={cards[0]?.card?.card?.header?.title}
              data={cards[0]?.card?.card?.imageGridCards}
            />
          </>
        )}

        <hr className="border border-[rgb(240,240,245)] my-3 mx-2" />
        <Search onFilterData={filterData} />
        <div className="relative inline-block mx-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="border-2 border-gray-400 text-gray-700 font-medium rounded-full text-lg px-5 py-1 text-center inline-flex items-center"
            type="button"
            onClick={() => setShowDropdown((prevState) => !prevState)}
          >
            Sort By
          </button>
          <Dropdown showDropdown={showDropdown} sortRestaurants={sortRestaurants} />
        </div> 

        {cards && (
          <h1 className="font-bold text-xl ml-3 p-2">
            {cards[2]?.card?.card?.title}
          </h1>
        )}
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
