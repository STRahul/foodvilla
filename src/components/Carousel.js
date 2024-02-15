import { useRef } from "react";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

const image_cdn =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";
const Carousel = ({ data, label }) => {
  const carouselRef = useRef();

  function slideLeft(){
    carouselRef.current?.scrollTo({ left: carouselRef.current?.scrollLeft - 500, behavior: 'smooth' })
  }
  function slideRight(){
    carouselRef.current?.scrollTo({ left: carouselRef.current?.scrollLeft + 500, behavior: 'smooth' })
  }
  return (
    data && (
      <div className="p-2 mt-3 ml-3">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">{label}</h1>
          <div className="flex mx-2">
            <IoArrowBackCircle
              className="m-1 cursor-pointer opacity-30 hover:opacity-100 duration-100"
              onClick={slideLeft}
              size={35}
            />
            <IoArrowForwardCircle
              className="m-1 cursor-pointer opacity-30 hover:opacity-100 duration-100"
              onClick={slideRight}
              size={35}
            />
          </div>
        </div>

        <div className="flex my-5 mr-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden" ref={carouselRef}>
          {data?.info?.map((item) => (
            <img
              key={item.imageId}
              className="w-32"
              src={image_cdn + item.imageId}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Carousel;
