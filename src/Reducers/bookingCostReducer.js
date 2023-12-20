const { useReducer } = require("react");

const initialState = {
  flightPrice: 0,
  flightCompany: "",
  numberOfPersons: 0,
  ages: { adult: 0, baby: 0 },
  flightClass: "",
  luggagesIncluded: 0,
  luggagesPrice: 0,
  luggageWeight: 0,
  mealType: "",
  totalPrice: undefined,
};
const bookingCostReducer = (state, parameter) => {
  switch (parameter.type) {
    case "TOTAL_PRICE":
      const adult_count = state.ages.adult;
      let total = state.flightPrice * adult_count;
      const luggages_included = state.luggagesIncluded;
      for (let i = 0; i < luggages_included; i++) {
        if (i > 0) {
          total += 50; // 50$ per extra bag for the second adult etc...
        }
      }
      total = +total.toFixed(2);
      switch (state.flightClass) {
        default:
        case "economy":
          total *= 1;
          break;
        case "business":
          total *= 2;
          break;
        case "first-class":
          total *= 3;
          break;
      }
      return {
        ...state,
        totalPrice: total,
      };
    case "ADULT":
      return { ...state, ages: { ...state.ages, adult: +parameter.count } };
    case "BABY":
      return { ...state, ages: { ...state.ages, baby: +parameter.count } };
    case "FLIGHT_CLASS":
      return { ...state, flightClass: parameter.value };
    case "LUGGAGE_INCLUDED":
      return { ...state, luggagesIncluded: +parameter.value };
    case "FLIGHT_PRICE":
      return { ...state, flightPrice: +parameter.value };
    case "LUGGAGE_PRICE":
      return { ...state, luggagesPrice: +parameter.value };
    case "MEAL_TYPE":
      return { ...state, mealType: parameter.value };
    default:
      return state;
  }
};

export const useBookingCostReducer = () => {
  const reducer = useReducer(bookingCostReducer, initialState);
  return reducer;
};