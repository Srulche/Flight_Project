import React, { useCallback } from "react";
import "./cards.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import "aos/dist/aos.css";
import { useUser } from "../../Context/UserContext";
import DateString from "../DateString/DateString";



const BookedFlightCard = ({ flight }) => {
  return (
    <div data-aos="fade-up" className="singleDestination">
      {/* <div className="imageDiv">
    <img src={imgSrc} alt={destTitle} />
  </div> */}
      <div className="cardInfo profile-card">
        <div className="flight-dep-arr">
          <div className="left">
            <h4 className="destTitle">{flight.departure}</h4>
            <span className="continent flex">
              <HiOutlineLocationMarker className="icon" />
              <span className="name">{flight.departure}</span>
            </span>
          </div>
          <div>{`------>`}</div>
          <div className="right">
            <h4 className="destTitle">{flight.destination}</h4>
            <span className="continent flex">
              <HiOutlineLocationMarker className="icon" />
              <span className="name">{flight.destination}</span>
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
            <h5 className="price">${flight.totalPrice}</h5>
          </div>
        </div>
        <div className="desc">
          <p>{flight.estimatedDurationInHours} Hours</p>
        </div>
        <div className="desc">
          <p>
            Departure date
            <br />
            <DateString dateString={flight.flightDate} />
          </p>
        </div>
      </div>
    </div>
  );
};

const BookedFlightCards = () => {
  const { user } = useUser();

  const FlightCards = useCallback(() => {
    if (user === undefined) return null;
    if (!user.bookedFlights.length) return <p>No Booked fllights..</p>;
    return (
      <>
        {React.Children.toArray(
          (user.bookedFlights || []).map((flight) => (
            <BookedFlightCard flight={flight} />
          ))
        )}
      </>
    );
  }, [user]);

  if (user === undefined) return null;
  return <>
  <br/>
  {user.bookedFlights.length > 0 &&<center><p>Your booked flights</p></center>}
  <FlightCards />
  </>
};

export default BookedFlightCards;
