import { IMG_URL } from "../constant";

const RestaurantCard = ({name,cloudinaryImageId,cuisines,avgRating})=>{
    return(
        <div className="m-4 md:m-2 px-4 py-2 group">
          <img className="h-36 md:h-40 w-full rounded-xl shadow-xl group-hover:rounded-none group-hover:scale-105 duration-150" src={IMG_URL+cloudinaryImageId} alt="res-image" />
          <h1 className="text-xl font-bold mt-2 ml-3">{name}</h1>
          <h2 className="font-semibold text-xl ml-3">{avgRating} stars</h2>
          <h3 className="font-medium ml-3">{cuisines?.join(", ")}</h3>
        </div>
    )
}

export default RestaurantCard;