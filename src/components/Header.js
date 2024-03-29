import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Title = () => {
  return (
    <Link to="/">
      <svg
        className="_8pSp- w-7 md:w-9"
        viewBox="0 0 559 825"
        fill="#fc8019"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M542.92 388.542C546.805 366.526 542.355 349.598 530.881 340.76C513.621 327.466 487.698 320.236 425.954 320.236C380.271 320.236 331.225 320.286 310.268 320.275C308.322 319.894 301.285 317.604 301.02 309.112L300.734 174.289C300.727 165.779 307.531 158.857 315.943 158.839C324.369 158.825 331.204 165.723 331.211 174.226C331.211 174.226 331.421 247.414 331.441 273.424C331.441 275.936 332.892 281.8 338.549 283.328C375.43 293.267 561.865 285.999 558.967 251.804C543.147 109.96 424.476 0 280.394 0C235.021 0 192.065 10.9162 154.026 30.2754C62.9934 77.5955 -1.65904 173.107 0.0324268 283.43C1.23215 361.622 52.2203 500.605 83.434 521.234C97.8202 530.749 116.765 527.228 201.484 527.228C239.903 527.228 275.679 527.355 293.26 527.436C295.087 527.782 304.671 530.001 304.671 538.907L304.894 641.393C304.915 649.907 298.104 656.826 289.678 656.829C281.266 656.843 274.434 649.953 274.42 641.446C274.42 641.446 275.17 600.322 275.17 584.985C275.17 581.435 275.424 575.339 265.178 570.727C231.432 555.553 121.849 564.712 115.701 581.457C113.347 587.899 125.599 612.801 144.459 644.731C170.102 685.624 211.889 747.245 245.601 792.625C261.047 813.417 268.77 823.813 280.467 824.101C292.165 824.389 300.514 814.236 317.213 793.928C383.012 713.909 516.552 537.663 542.92 388.542Z"
          fill="url(#paint0_linear_19447_66107)"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_19447_66107"
            x1="445.629"
            y1="63.8626"
            x2="160.773"
            y2="537.598"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF993A"></stop>
            <stop offset="1" stopColor="#F15700"></stop>
          </linearGradient>
        </defs>
      </svg>
    </Link>
  );
};

const Header = () => {
  const cartItems = useSelector((store) => store?.cart?.cartItems);
  const [cartIsHighlighted, setCartIsHighlighted] = useState(false);
  const totalQuantity = cartItems.length > 0?cartItems?.reduce((acc,item)=>{
      return acc+item.quantity;
  },0):0;
  
  useEffect(()=>{
    setCartIsHighlighted(true);
    const timer = setTimeout(() => {
      setCartIsHighlighted(false);
    }, 300);
    return ()=> clearTimeout(timer);
  },[cartItems])
  return (
    <div className="flex justify-between p-4 m-0 bg-white shadow-xl">
      <Title />
      <div>
        <ul className="flex justify-between gap-2 md:gap-4 p-2 md:text-xl">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#ffa700]" : "text-black"
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-[#ffa700]" : "text-black"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-[#ffa700]" : "text-black"
              }
            >
              Contact
            </NavLink>
          </li>
          <li className={cartIsHighlighted?'scale-110 duration-300 ease-out':''}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "text-[#ffa700]" : "text-black"
              }
            >
              <span className="bg-[#60b246] px-2 text-white text-[medium] rounded-t-md mr-2">{totalQuantity}</span>
              <span>Cart</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
