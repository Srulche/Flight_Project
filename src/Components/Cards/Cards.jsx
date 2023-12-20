import React, { useCallback } from "react";
import "./cards.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import "aos/dist/aos.css";
import { useSuggestedFlights } from "../../Context/SuggestedFlightsContext";
import { useFlight } from "../../Context/FlightContext";
import DateString from "../DateString/DateString";
import { ClipLoader } from "react-spinners";


const FlightCard = ({ flight, handleOrderFlight }) => {
  return (
    <div data-aos="fade-up" className="singleDestination">
      {/* <div className="imageDiv">
    <img src={imgSrc} alt={destTitle} />
  </div> */}
      <div className="cardInfo">
        <div className="flight-dep-arr">
          <div className="left">
            <h4 className="destTitle">{flight.departureString}</h4>
            <span className="continent flex">
              <HiOutlineLocationMarker className="icon" />
              <span className="name">{flight.departureString}</span>
            </span>
          </div>
          <div>{`------>`}</div>
          <div className="right">
            <h4 className="destTitle">{flight.arrivalString}</h4>
            <span className="continent flex">
              <HiOutlineLocationMarker className="icon" />
              <span className="name">{flight.arrivalString}</span>
            </span>
          </div>
        </div>

        <div className="fees flex">
          <div className="grade">
            <span>{flight.flightName}</span>
          </div>
          <div className="grade price-container">
            <div>Economy</div>
            <br />
            <h5 className="price">${flight.price}</h5>
          </div>
        </div>
        <div className="desc">
          <p>{flight.flightDuration} Hours</p>
        </div>
        <div className="desc">
          <p>
            Departure date
            <br />
            <DateString dateString={flight.departure.estimated} />
          </p>
        </div>
        <div className="desc">
          <p>
            Arrival date
            <br />
            <DateString dateString={flight.arrival.estimated} />
          </p>
        </div>
        <button onClick={() => handleOrderFlight(flight)} className="btn flex">
          Book now <HiOutlineClipboardCheck className="icon" />
        </button>
      </div>
    </div>
  );
};

const Cards = () => {
  const { suggestedFlights , loading:flightsLoading } = useSuggestedFlights();
  const { setFlight: handleOrderFlight } = useFlight();

  const FlightCards = useCallback(() => {
    if (suggestedFlights === undefined) return null;
    if (!suggestedFlights.length && !flightsLoading) return <p>No results..</p>;
    return (
      <>
        {React.Children.toArray(
          (suggestedFlights || []).map((flight) => (
            <FlightCard handleOrderFlight={handleOrderFlight} flight={flight} />
          ))
        )}
      </>
    );
  }, [handleOrderFlight, suggestedFlights]);


 
  if (suggestedFlights === undefined) return null;


  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 data-aos="fade-right" className="title">
          Search results
        </h3>
      </div>
      <center className="loading">

      <ClipLoader
        color={'var(--PrimaryColor)'}
        loading={flightsLoading}
        size={70}
        title="Loading.."
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <label className={flightsLoading ? "show" : "hide"}>We are searching relevant flights. Thank you for your patience</label>
      </center>

      <div className="secContent grid">
        <FlightCards />
      </div>
    </section>
  );
};

export default Cards;
