import { useSelector, useDispatch } from "react-redux";
import CartDetails from "./CartDetails";
import { clearCart } from "../utils/CartSlice";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const totalQuantity = cartItems.length > 0?cartItems?.reduce((acc,item)=>{
    return acc+item.quantity;
},0):0;
  return (
    <div className="m-3 p-3">
      <h1 className="font-bold text-xl">Cart Items - {totalQuantity}</h1>
      {cartItems.length > 0 && (
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-green-700 p-2 m-2 rounded-lg text-white text-xl"
        >
          Clear Cart
        </button>
      )}{" "}
      <div className="flex flex-wrap">
        {cartItems?.map((item) => (
          <CartDetails {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
