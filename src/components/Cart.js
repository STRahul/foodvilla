import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/CartSlice";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const totalAmount =
    cartItems.length > 0
      ? cartItems?.reduce((acc, item) => {
          return acc + item.totalPrice/100;
        }, 0)
      : 0;

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col m-3">
        <h1 className="text-2xl font-bold p-2">Your cart is empty.</h1>
        <p className="text-xl p-2">
          You can go to home page to view more restaurants
        </p>
        <Link className="bg-[#ffa700] p-3 text-white text-xl rounded-md" to="/">See Restaurant near you</Link>
      </div>
    );
  }
  return (
    <div className="overflow-x-hidden [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start mb-16">
        <div className="md:w-[50%] p-4">
          <div className="flex items-center justify-around">
            <h2 className="text-2xl font-bold">Order Details</h2>
            <button
              onClick={() => dispatch(clearCart())}
              className=" bg-pink-500 p-2 m-2 rounded-lg text-white text-xl">
              Clear Cart
            </button>
          </div>

          <>
            {cartItems.map((item) => (
              <MenuItem key={item?.card?.info?.id} {...item} cart={true} />
            ))}
          </>
        </div>
        <div className="w-[20rem] h-72 rounded-md shadow-md mt-8 p-7 leading-loose mb-9 md:mb-0">
          <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
          <table className="w-60 p-1 text-xl leading-loose">
            <tbody>
              <tr>
                <td>Sub-Total</td>
                <td> ₹{totalAmount}</td>
              </tr>
              <tr>
                <td>Delivery Charges </td>
                <td>₹100</td>
              </tr>
              <tr>
                <td className="font-bold">Grand-Total</td>
                <td className="font-bold">₹{totalAmount + 100}</td>
              </tr>
            </tbody>
          </table>
          <button className="w-full bg-[#e67e22] mt-3 rounded-md py-3 text-xl text-white">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
