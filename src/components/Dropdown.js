import React from "react";

const Dropdown = ({showDropdown, sortRestaurants}) => {
  return (
    <div
      id="dropdown"
      className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-xl shadow w-36 dark:bg-gray-700 ${
        showDropdown ? "block" : "hidden"
      }`}
    >
      <ul
        className="py-2 text-lg text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          onClick={() => sortRestaurants("sla")}
        >
          Delivery Time
        </li>
        <li
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          onClick={() => sortRestaurants("rating")}
        >
          Rating
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
