import { useState, useEffect } from "react";
const useRestaurantMenu = (id,url) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    const data = await fetch(url + id);
    const jsonData = await data.json();
    setResInfo(jsonData.data);
  };
  return resInfo;
};
export default useRestaurantMenu;
