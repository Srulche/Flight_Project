import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter } from "react-router-dom"; // Creating a router import
import App from "./App";
import { FlightContextProvider } from "./Context/FlightContext";
import { SuggestedFlightContextProvider } from "./Context/SuggestedFlightsContext";
import { UserContextProvider } from "./Context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FlightContextProvider>
    <UserContextProvider>
      <SuggestedFlightContextProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </SuggestedFlightContextProvider>
    </UserContextProvider>
  </FlightContextProvider>
);
