const Shimmer = () => {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {Array(15)
        .fill("")
        .map((item,index) => (
          <div
            className="h-64 p-3 m-3 bg-gray-300 rounded-lg"
            key={index}
          ></div>
        ))}
    </div>
  );
};

export default Shimmer;
