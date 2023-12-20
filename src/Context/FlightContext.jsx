import { createContext,useContext,useState } from "react";

const FlightContext = createContext(null)

const FlightContextProvider =  ({children}) => {
    const [flight, setFlight] = useState(null);
    const [showingDetails,setShowingDetails] = useState()
    return <FlightContext.Provider value={{flight,setFlight,showingDetails,setShowingDetails}}>
        {children}
    </FlightContext.Provider>
}

const useFlight = () => {
    const context = useContext(FlightContext)
    if(!context) {
        throw new Error("Flight context not provided")
    }
    return context
}

export  { useFlight, FlightContextProvider }




export default FlightContext;