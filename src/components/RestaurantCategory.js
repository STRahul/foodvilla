import MenuItem from "./MenuItem";

const RestaurantCategory = ({ data ,showItems,show,restId}) => {
  return (
    <div onClick={show} className="bg-[#f9fafb] mx-auto p-4 my-3 md:w-[75%] lg:w-[60%]">
      <div className="flex justify-between py-2 cursor-pointer">
        <span className="text-xl font-bold">
          {data.title} ({data.itemCards.length})
        </span>
        <span className="text-3xl font-bold">&darr;</span>
      </div>
      {showItems && data?.itemCards?.map(
          (item) => (
            <MenuItem
              {...item?.card?.info}
              key={item?.card?.info?.id}
              restId={restId}
            />
          )
        )} 
    </div>
  );
};

export default RestaurantCategory;
