const utils = require("../utils");
const axios = require("axios");
const dotenv = require("dotenv");
const User = require("../models/User");
const BookedFlight = require("../models/BookedFlight");

dotenv.config();

const API_KEY = process.env.AVIATION_STACK_APIKEY;
const AIRLABS_API_KEY = process.env.AIRLABS_APIKEY;

const search = async (
  /** @type {{departure:string , arrival: string, date: string}} */
  searchParams
) => {
  const departure = encodeURIComponent(
    searchParams.departure.toLowerCase().replaceAll("-", " ")
  );
  const arrival = encodeURIComponent(
    searchParams.arrival.toLowerCase().replaceAll("-", " ")
  );

  const { data: deparure_suggestions_response } = await axios.get(
    `http://airlabs.co/api/v9/suggest?q=${departure}&api_key=${AIRLABS_API_KEY}`
  );

  const { data: arrival_suggestions_response } = await axios.get(
    `http://airlabs.co/api/v9/suggest?q=${arrival}&api_key=${AIRLABS_API_KEY}`
  );

  if (
    !deparure_suggestions_response.response.airports ||
    deparure_suggestions_response.response.airports < 1 ||
    !arrival_suggestions_response.response.airports ||
    arrival_suggestions_response.response.airports < 1
  ) {
    return [];
  }

  // departure and arrival airport codes
  const dep_iata = deparure_suggestions_response.response.airports[0].iata_code;
  const arr_iata = arrival_suggestions_response.response.airports[0].iata_code;

  // request flights from dearture airport to arrival airport
  // TODO: Date filter
  const response = await axios.get(
    `http://api.aviationstack.com/v1/flights?dep_iata=${dep_iata}&arr_iata=${arr_iata}&access_key=${API_KEY}`
  );

  const allFlights = response.data.data;

  const flights = allFlights.map((flight) => {
    const flightDuration = utils.dateDiffInHours(
      flight.arrival.estimated,
      flight.departure.estimated
    );

    return {
      flightDuration,
      flightCompany: flight.airline.name,
      flightName: `${flight.airline.name} ${flight.flight.iata}`,
      price: (300 + Math.random() * 1000).toFixed(2),
      arrivalString: searchParams.arrival,
      departureString: searchParams.departure,
      ...flight,
    };
  });

  return flights;
};

const bookFlight = async ({ id }, flightToBook) => {
  const user = await User.findById(id);
  const bookedFlight = await BookedFlight.create(flightToBook);
  user.bookedFlights.push(bookedFlight);
  await user.save();
  return bookedFlight;
};

module.exports = {
  search,
  bookFlight,
};
