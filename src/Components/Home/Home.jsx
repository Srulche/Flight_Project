import React, { useCallback, useEffect } from "react";
import "./home.css";
import "../Cards/cards.css";
import video from "../../Assets/video.mp4";
// import { FiFacebook } from "react-icons/fi";
// import { AiOutlineInstagram } from "react-icons/ai";
// import { FaTripadvisor } from "react-icons/fa";
// import { BsListTask } from "react-icons/bs";
// import { TbApps } from "react-icons/tb";
import Aos from "aos";
import "aos/dist/aos.css";
// import FlightList from "../FlightList/FlightList";
import SearchBar from "../SearchBar/SearchBar";
import { useFlight } from "../../Context/FlightContext";
import BookFlight from "../BookFlight/BookFlight";
import { useSuggestedFlights } from "../../Context/SuggestedFlightsContext";
import Cards from "../Cards/Cards";
import Main from "../Main/Main";
import { useUser } from "../../Context/UserContext";

const Home = () => {
  const { flight } = useFlight();
  const { user } = useUser();
  const { suggestedFlights } = useSuggestedFlights();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const BookFlightSection = useCallback(() => {
    if (suggestedFlights === undefined) return null;
    if (!suggestedFlights.length) return null;
    if (!flight) return null;
    return (
      <div className="modal-container">
        <BookFlight flight={flight} />
      </div>
    );
  }, [suggestedFlights, flight]);

  return (
    <>
      <section className="home">
        <div className="overlay"></div>
        <video src={video} muted autoPlay loop type="video/mp4"></video>

        <div className="homeContent container">
          <div className="textDiv">
            {user && <h2>Hello {user.fullName}</h2>}
            <hr style={{border: "2px solid white"}} />
            {/* <span data-aos="fade-up" className="smallText">
            Our Packages
          </span> */}
            <h1 data-aos="fade-up" className="homeTitle">
              Search your Holiday
            </h1>
          </div>

          <SearchBar />
          <BookFlightSection />
          <div data-aos="fade-up" className="homeFooterIcons flex"></div>
        </div>
      </section>
      <Cards />
      <Main />
    </>
  );
};

export default Home;
