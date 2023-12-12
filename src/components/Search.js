import React,{ useState } from 'react'

const Search = ({onFilterData}) => {
    const [searchText, setSearcgText] = useState("");

  return (
    <div className="flex p-3 mt-2 bg-white shadow-md">
        <input
          className=" ml-3 p-1 px-2 border border-sky-200 focus:border-green-600 focus:bg-blue-100 outline-none"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearcgText(e.target.value)}
        />
        <button
          className="bg-blue-500 ml-3 px-4 py-1 text-xl text-white rounded-md"
          onClick={()=>onFilterData(searchText)}
        >
          Search
        </button>
      </div>
  )
}

export default Search