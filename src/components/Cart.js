import { useSelector, useDispatch } from "react-redux";
import CartDetails from "./CartDetails";
import { clearCart } from "../utils/CartSlice";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const totalQuantity =
    cartItems.length > 0
      ? cartItems?.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0)
      : 0;
  return (
    <>
      <div className="flex justify-between items-center px-6 py-3">
        <h1 className="font-bold text-xl">Cart Items - {totalQuantity}</h1>
        {cartItems.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className=" bg-green-700 p-2 m-2 rounded-lg text-white text-xl"
          >
            Clear Cart
          </button>
        )}
      </div>
      <div className="overflow-x-hidden max-w-[1280px] mx-auto [&::-webkit-scrollbar]:hidden">
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] xl:max-w-[1280px]">
          {cartItems?.map((item) => (
           <a> <CartDetails {...item} key={item.id+item.quantity} /></a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
