import React, { useEffect } from "react";
import { useFlight } from "../../Context/FlightContext";
import "./bookFlight.css";
import { useBookingCostReducer } from "../../Reducers/bookingCostReducer";
import {
  HiOutlineClipboardCheck,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const BookFlight = () => {
  const nav = useNavigate();
  const { flight, setFlight } = useFlight();
  const [bookingCostState, dispatchBooking] = useBookingCostReducer();
  const { bookFlight, error } = useUser();
  // Complete all the params that effects the price in the useEffect
  const handleAdultChange = (event) => {
    dispatchBooking({
      type: "ADULT",
      count: event.target.value,
    });
  };
  const handleBabyChange = (event) => {
    dispatchBooking({
      type: "BABY",
      count: event.target.value,
    });
  };

  // My addition:
  const handleFlightClassChange = (event) => {
    dispatchBooking({
      type: "FLIGHT_CLASS",
      value: event.target.value,
    });
  };
  const handleLuggageIncludedChange = (event) => {
    dispatchBooking({
      type: "LUGGAGE_INCLUDED",
      value: event.target.value,
    });
  };

  const handleLuggageWeightChange = (event) => {
    dispatchBooking({
      type: "LUGGAGE_WEIGHT",
      value: event.target.value,
    });
  };
  const handlePriceCalc = () => {
    dispatchBooking({
      type: "TOTAL_PRICE",
    });
  };
  useEffect(() => {
    if (flight) {
      dispatchBooking({ type: "FLIGHT_PRICE", value: flight.price });
    }
  }, [flight, dispatchBooking]);

  if (!flight) return null;

  return (
    <div className="calculator modal-content cardInfo">
      <div className="flight-dep-arr">
        <div className="left">
          <h4 className="destTitle">{flight.departureString}</h4>
          <span className="continent flex">
            <HiOutlineLocationMarker className="icon-red" />
            <span className="name">{flight.departureString}</span>
          </span>
        </div>
        <div className="destination-arrow">{`---------->`}</div>
        <div className="right">
          <h4 className="destTitle">{flight.arrivalString}</h4>
          <span className="continent flex">
            <HiOutlineLocationMarker className="icon-red" />
            <span className="name">{flight.arrivalString}</span>
          </span>
        </div>
      </div>
      <center>
        <div className="flight-name">{flight.flightName}</div>
      </center>
      <form className="book-calc">
        <div className="adultDiv">
          Adult{" "}
          <input
            type="number"
            onChange={handleAdultChange}
            value={bookingCostState.ages.adult}
          />
        </div>
        <div className="babyDiv">
          Baby{" "}
          <input
            type="number"
            onChange={handleBabyChange}
            value={bookingCostState.ages.baby}
          />
        </div>
        <div className="flightClass">
          Flight Class{" "}
          <select
            onChange={handleFlightClassChange}
            value={bookingCostState.flightClass}
          >
            <option value="economy">Economy</option>
            <option value="first-class">First-Class</option>
            <option value="business">Business</option>
          </select>
        </div>
        <div className="luggageDiv">
          Luggage Included{" "}
          <input
            type="number"
            min={0}
            max={15}
            onChange={handleLuggageIncludedChange}
            value={bookingCostState.luggagesIncluded}
          />
        </div>
        <div className="luggageDiv">
          Average Luggage weight{" "}
          <input
            type="number"
            min={0}
            max={50}
            onChange={handleLuggageWeightChange}
            value={bookingCostState.luggageWeight}
          />
        </div>
        <div className="mealDiv">
          Meal Type{" "}
          <select>
            <option value="diary">Diary</option>
            <option value="fleshy">Fleshy</option>
            <option value="vagetarian">Vegetarian</option>
            <option value="kosher-food">Kosher-food</option>
          </select>
        </div>
        <div>
          <b>Base cost: {(+flight.price).toFixed(2)}$</b>
        </div>
        <div className={bookingCostState.totalPrice ? `` : "cost"}>
          <b>Total cost: {bookingCostState?.totalPrice?.toFixed(2) ?? 0}$</b>
        </div>
      </form>
      <center className="flex-row">
        <button
          onClick={() => {
            handlePriceCalc();
          }}
          className="btn flex"
        >
          Calc price <HiOutlineClipboardCheck className="icon" />
        </button>
        {error && <div className="text-sm">{"Please try again later"}</div>}

        {bookingCostState.totalPrice !== undefined && (
          <button
            onClick={async () => {
              console.log(flight)
              const success = await bookFlight(flight, bookingCostState);
              if (success) {
                message.success("Flight booked successfully");
                setFlight(undefined); // closes modal
                nav("/auth/profile");
              } else {
                message.error(
                  "There was a problem booking the flight, please try again later"
                );
              }
            }}
            className="btn flex"
          >
            Book <HiOutlineClipboardCheck className="icon" />
          </button>
        )}
      </center>
      <div
        onClick={() => {
          setFlight(undefined);
        }}
        className="close-button"
      >
        <IoClose className="icon small" />
      </div>
    </div>
  );
};

export default BookFlight;
