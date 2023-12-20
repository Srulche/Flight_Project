

import { createContext,useContext,useState } from "react";
const SuggestedFlightContext = createContext(null);



const SuggestedFlightContextProvider = ({children}) => {
    const [suggestedFlights, setSuggestedFlights] = useState(undefined);
    const [loading,setLoading] = useState(false)
    

    return <SuggestedFlightContext.Provider value={{
        setSuggestedFlights,
        setLoading,
        loading,
        suggestedFlights
    }}>
        {children}
    </SuggestedFlightContext.Provider>
}

const useSuggestedFlights = () => {
    const context = useContext(SuggestedFlightContext)
    if(!context) {
        throw new Error("Suggested flight context not provided")
    }
    return context
}

export  {useSuggestedFlights, SuggestedFlightContextProvider}