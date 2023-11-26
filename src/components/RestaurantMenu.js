import { useState, useEffect } from "react";
import { useParams } from "react-router";
import MenuItem from "./MenuItem";

const RestaurantMenu = () => {
  const { restId } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [menu, setMenu] = useState([]);

  const API_URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=27.2155456&lng=77.9752926&restaurantId=${restId}&catalog_qa=undefined&submitAction=ENTER`;

  useEffect(() => {
    getRestaurantMenu();
  }, []);

  async function getRestaurantMenu() {
    const data = await fetch(API_URL);
    const jsonData = await data.json();
    // console.log(
    //   jsonData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card
    //     .card.itemCards
    // );
    setRestaurant(jsonData?.data?.cards);
    setMenu(
      jsonData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
        ?.card?.itemCards
    );
  }

  if(restaurant.length === 0){
      return <p className="m-2 p-2 font-bold text-xl text-center">Loading.....</p>
  }

  return (
    <div className="mt-5 ">
      <div className="flex justify-around p-2">
        <div>
          <h1 className="font-bold text-xl">
            {restaurant[0]?.card?.card?.info?.name}
          </h1>
          <h2>{restaurant[0]?.card?.card?.info?.cuisines?.join(", ")}</h2>
          <h2>
            {restaurant[0]?.card?.card?.info?.areaName},{" "}
            {restaurant[0]?.card?.card?.info?.sla?.lastMileTravelString}
          </h2>
        </div>
        <div className="border p-2 rounded-md">
          <h1 className="p-1 text-green-800 font-bold text-xl">
            {restaurant[0]?.card?.card?.info?.avgRatingString} stars
          </h1>
          <hr></hr>
          <h2 className="p-1 font-semibold">
            {restaurant[0]?.card?.card?.info?.totalRatingsString}
          </h2>
        </div>
      </div>
      <hr className="border-t-8 border-indigo-50" />
      <div className="mt">
        {menu?.map((item) => (
          <MenuItem {...item?.card?.info} key={item?.card?.info?.id} restId={restId} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
