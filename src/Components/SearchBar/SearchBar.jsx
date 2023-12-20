import React from "react";
import { GrLocation } from "react-icons/gr";
import "./searchBar.css";
import { useSuggestedFlights } from "../../Context/SuggestedFlightsContext";
import { searchFlights } from "../../Services/flightService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";


const SearchBar = () => {
  const { setSuggestedFlights,setLoading: setFlightsLoading } = useSuggestedFlights();
  const nav = useNavigate();

  const onSearchSubmit = async (e) => {
    e.preventDefault();

    /** @type {{departure:string,arrival:string,date:string}}}  */
    const searchForm = Object.fromEntries(new FormData(e.target).entries());
    try {
      setSuggestedFlights([])
      setFlightsLoading(true)
      const search_response = await searchFlights(searchForm);

      if (search_response.status === 200) {
        setSuggestedFlights(search_response.data);
      } else if (search_response.status === 401) {
        setFlightsLoading(false)
        message.info("Please sign in to use our services")
        nav("/auth/sign-in");
        return
      } else {
        console.error(search_response.message);
      }
    } catch (e) {
      message.error(e.message)
    }
    setFlightsLoading(false)             
  };

  return (
    <form onSubmit={onSearchSubmit} data-aos="fade-up" className="cardDiv grid">
      <div className="destinationInput">
        <label htmlFor="city">Enter departure location:</label>
        <div className="input flex">
          <input
            type="text"
            name="departure"
            required
            placeholder="Enter departure name here...."
          />
          <GrLocation className="icon" />
        </div>
      </div>
      <div className="destinationInput">
        <label htmlFor="city">Search your destination:</label>
        <div className="input flex">
          <input
            type="text"
            name="arrival"
            required
            placeholder="Enter destination name here...."
          />
          <GrLocation className="icon" />
        </div>
      </div>
      <div className="dateInput">
        <label htmlFor="date">Select your date:</label>
        <div className="input flex">
          <input type="date" name="date" />
        </div>
      </div>
      <button className="srcBtn" type="submit">
        Search
      </button>
      {/*<div className="searchOptions flex">
        <HiFilter className="icon" />
        <span>MORE FILTERS</span>
      </div>*/}
    </form>
  );
};

export default SearchBar;
