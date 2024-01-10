const Carousel = ({ data, label, customStyle = false, image_cdn }) => {
  return (
    data && <div className="p-2 mt-3 ml-3">
      <h1 className="font-bold text-2xl">{label}</h1>
      <div className="flex my-5 mr-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {data?.info?.map((item) => (
          <img
            key={item.imageId}
            className={customStyle ? "w-32" : "h-[20rem] p-2"}
            src={image_cdn + item.imageId}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
