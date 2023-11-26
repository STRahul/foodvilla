// import { useDispatch } from "react-redux";
// import { removeItem } from "../utils/CartSlice";
import { IMG_URL } from "../constant";

const CartDetails = ({name,category,imageId,totalPrice,quantity,id})=>{
    // const dispatch = useDispatch();
    return(
        <div className="w-60 h-[330px] shadow-lg m-5 p-3 rounded-xl">
          <img className="h-[45%] w-60 rounded-lg p-1" src={IMG_URL+imageId} alt="res-image" />
          <h1 className="text-xl font-bold">{name}</h1>
          <h2 className="font-semibold text-xl">{category}</h2>
          <p>Rs. {totalPrice/100}</p>
          {/* <p className="font-bold text-xl">quantity: {quantity} - <button className="bg-green-700 text-white font-medium p-1 rounded-md" onClick={()=> {
            dispatch(removeItem({id}))}}>Remove</button></p> */}
            <p>Quantity: {quantity}</p>
          <div>
            
          </div>
        </div>
    )
}

export default CartDetails;