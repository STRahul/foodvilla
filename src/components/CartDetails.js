import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/CartSlice";
import { IMG_URL } from "../constant";

const CartDetails = (props) => {
  const { name, category, imageId, totalPrice, quantity, id,restId,price, defaultPrice } = props;
  const dispatch = useDispatch();
  return (
    <div className="h-[330px] shadow-lg m-5 p-3 rounded-xl">
      <img
        className="w-full h-[45%] rounded-lg p-1"
        src={IMG_URL + imageId}
        alt="res-image"
      />
      <h1 className="text-xl font-bold">{name}</h1>
      <h2 className="font-semibold text-xl">{category}</h2>
      <p>Rs. {totalPrice / 100} ({price/100 | defaultPrice/100 }/item)</p>
      <div className="flex justify-between">
        <p className="font-bold text-xl">Quantity: {quantity}</p>
        <div className="flex px-4 gap-4 items-center border border-gray-400">
          <button className="text-lg" onClick={()=>dispatch(removeItem({id}))}>-</button>
          <p className="text-green-900 font-bold cursor-pointer">1</p>
          <button className="text-green-900 font-bold text-lg" onClick={()=>{
            dispatch(addItem({...props,quantity:1,restId}))
          }}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
