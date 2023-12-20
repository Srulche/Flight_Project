import React, { useEffect, useState } from 'react'
import * as userService from '../Services/userService' 
import * as flightService from '../Services/flightService' 

const UserContext = React.createContext(null)

export const UserContextProvider = ({children}) => {
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [user ,setUser] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const fetchUser = async () => {
        if(!token) return  // no token -> no user ;/
        try {
            setLoading(true)
            setError(undefined)
            const response = await userService.me() 
            if(response.user?._id) {
                setUser(response.user) 
            } else {
                localStorage.removeItem('token')
                setError("Session not present, please login")
                setLoading(false)
            }
        } catch(e) {
          setUser(null)
          //  setError(e)
          console.log(e)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchUser()
    },[token])


    const bookFlight = async (flightToBook, bookingCostState) => {
        if(!user) return;
        setLoading(true)
        let success = true
        try {
            const dto = {
                flightName: flightToBook.flightName,
                destination:flightToBook.arrivalString,
                departure: flightToBook.departureString,
                totalPrice: bookingCostState.totalPrice,
                flightDate: flightToBook.departure.estimated,
                estimatedDurationInHours: +flightToBook.flightDuration,
                numberOfPeople: bookingCostState.numberOfPersons,
                people: bookingCostState.numberOfPersons,
                luggage: bookingCostState.luggageIncluded,
                user: user._id
            };
            const flight_book_response = await flightService.bookFlight(dto)
            if(flight_book_response.status === 201) {
                setUser({...user, bookedFlights: [...user.bookedFlights, flight_book_response.data]})
                setError(undefined)
            } else {
                success = false;
                setError(flight_book_response.message)
            }
        } catch(e) {
            console.log(e)
            setError(e)
            success = false
        }
        setLoading(false)
        return success
    }

    const signIn = async  (userDetails) => {
        try {
            setLoading(true)
            setError(undefined)
            const response = await userService.signIn(userDetails)
            if(response.data.access_token) {
                setToken(response.data.access_token)
                setLoading(false)
            } else {
                setError(response.message)
                setLoading(false)
                return null
            }
            return response.data.access_token
        } catch(e) {
            setError(e.data.message)
            setLoading(false)
        }
    }

    const signOut = () => {
        setUser(undefined)
        setToken(undefined)
        localStorage.removeItem('token')
    }

    return <UserContext.Provider value ={{user,bookFlight, error,setError, loading, setUser, signIn, signOut}}>
        {children}
    </UserContext.Provider>
}


export const useUser = () =>  {
    const context = React.useContext(UserContext)
    if(!context) throw new Error("User Context not provided.")
    return context
}