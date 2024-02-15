const image_cdn =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";
  const Carousel = ({ data, label }) => {
  return (
    data && <div className="p-2 mt-3 ml-3">
      <h1 className="font-bold text-2xl">{label}</h1>
      <div className="flex my-5 mr-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {data?.info?.map((item) => (
          <img
            key={item.imageId}
            className="w-32"
            src={image_cdn + item.imageId}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
