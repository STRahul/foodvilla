import { useState } from "react";
import { useParams } from "react-router";
import MenuItem from "./MenuItem";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useMediaQuery } from "react-responsive";
import { MENU_API, MOB_MENU_API } from "../constant";
const RestaurantMenu = () => {
  const { restId } = useParams();
  const [showIndex, setShowIndex] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const resInfo = useRestaurantMenu(restId, isMobile ? MOB_MENU_API : MENU_API);
  if (!resInfo)
    return (
      <p className="m-2 p-2 font-bold text-xl text-center">Loading.....</p>
    );

  const { name, areaName, cuisines, avgRating, sla, totalRatingsString } =
    resInfo?.cards[isMobile ? 2 : 0]?.card?.card?.info;

    const categories = isMobile
    ? resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )
    : resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
  if (!categories.length) {
    return (
      <p className="text-center m-4 p-4 text-3xl font-bold">
        {name} have not menu at this time.
      </p>
    );
  }

  return (
    <div className="mt-5 overflow-x-hidden [&::-webkit-scrollbar]:hidden max-w-[1280px] mx-auto">
      <div className="flex justify-around p-2">
        <div>
          <h1 className="font-bold text-xl">{name}</h1>
          <h2>{cuisines?.join(", ")}</h2>
          <h2>
            {areaName}, {sla?.lastMileTravelString}
          </h2>
        </div>
        <div className="border p-2 rounded-md">
          <h1 className="p-1 text-green-800 font-bold text-xl">
            &#9733; {avgRating}
          </h1>
          <hr></hr>
          <h2 className="p-1 font-semibold">{totalRatingsString}</h2>
        </div>
      </div>
      <hr className="border-t-8 border-indigo-50" />
      <div className="mt">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={index}
            data={category?.card?.card}
            showItems={showIndex === index}
            show={() => setShowIndex(index)}
            restId={restId}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
