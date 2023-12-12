import { IMG_URL } from "../constant";

const RestaurantCard = ({name,cloudinaryImageId,cuisines,avgRating})=>{
    return(
        <div className="m-4 md:m-2 px-4 py-2 hover:scale-90 duration-300 transition-all ease-in-out">
          <img className="h-36 md:h-40 w-full rounded-xl shadow-xl" src={IMG_URL+cloudinaryImageId} alt="res-image" />
          <h1 className="text-xl font-bold mt-2 ml-3">{name}</h1>
          <h2 className="font-semibold text-xl ml-3">{avgRating} stars</h2>
          <h3 className="font-medium ml-3">{cuisines?.join(", ")}</h3>
        </div>
    )
}

export default RestaurantCard;