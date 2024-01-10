import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FETCH_RESTAURANT_URL } from "../constant";
import RestaurantCard from "./RestaurantCard";
import Search from "./search";
import Shimmer from "./Shimmer";
import Carousel from "./Carousel";

const image_cdn =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";
const discount_image_cdn =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [cards, setCards] = useState();
  useEffect(() => {
    getRestaurantData();
  }, []);

  async function getRestaurantData() {
    const data = await fetch(FETCH_RESTAURANT_URL);
    const jsonData = await data.json();
    setCards(jsonData?.data?.cards);
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

  const sortRestaurants = () => {
    const data = filterRestaurants.toSorted((a,b)=>parseFloat(b.info.avgRating)-parseFloat(a.info.avgRating));
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
              data={cards[0]?.card?.card?.imageGridCards}
            />
            <Carousel
              customStyle={true}
              image_cdn={image_cdn}
              label={cards[1]?.card?.card?.header?.title}
              data={cards[1]?.card?.card?.imageGridCards}
            />
          </>
        )}

        <hr className="border border-[rgb(240,240,245)] my-3 mx-2" />
        <Search onFilterData={filterData} />
        <button
          onClick={sortRestaurants}
          className="bg-gray-400 mx-10 p-1 px-2 rounded-md text-white text-lg"
        >
          Sort by Rating
        </button>
        {cards && <h1 className="font-bold text-xl ml-3 p-2">
          {cards[2]?.card?.card?.header?.title}
        </h1>}
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
