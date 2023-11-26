import { IMG_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/CartSlice";

const MenuItem = (props) => {
    const { name, price, description, imageId,defaultPrice,restId } = props;
    const dispatch = useDispatch();
    const cartItems = useSelector(store=>store.cart.cartItems);

    const addItemHandler = (data)=>{
       if(cartItems.length > 0 && cartItems[0].restId !== data.restId) {
           const proceed = window.confirm("Items already in cart Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?");
           if(proceed){
            dispatch(addItem(data));
           }
       }
      else{
           dispatch(addItem(data));
       }
    }
  return (
    <>
      <div className="flex justify-around border-b-2 p-2">
        <div className="w-[35%]">
          <h1 className="font-bold text-xl">{name}</h1>
          <h2 className="font-medium">Rs {price / 100 | defaultPrice/100}</h2>
          <h2>{description}</h2>
        </div>
        <button className="p-2" onClick={()=>addItemHandler({...props,quantity: 1,restId})}>
          <img className="w-32" src={IMG_URL + imageId} />
          <label className="border px-7 py-1 bg-white text-green-900 font-bold text-xl rounded-md cursor-pointer">
            Add
          </label>
        </button>
      </div>
    </>
  );
};

export default MenuItem;
