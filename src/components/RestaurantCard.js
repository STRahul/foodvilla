import { IMG_URL } from "../constant";

const RestaurantCard = ({name,cloudinaryImageId,cuisines,avgRating})=>{
    return(
        <div className="h-[250px] md:h-[300px] shadow-lg m-8  md:m-2 p-4 rounded-xl hover:scale-90 duration-300 transition-all ease-in-out">
          <img className="h-[50%] md:h-[44%] w-full rounded-lg p-1" src={IMG_URL+cloudinaryImageId} alt="res-image" />
          <h1 className="text-xl font-bold">{name}</h1>
          <h2 className="font-semibold text-xl">{avgRating} stars</h2>
          <h3 className="font-medium">{cuisines?.join(", ")}</h3>
        </div>
    )
}

export default RestaurantCard;