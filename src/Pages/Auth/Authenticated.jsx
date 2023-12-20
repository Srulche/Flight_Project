import { Navigate } from "react-router-dom"
import { useUser } from "../../Context/UserContext"


export default function Authenticated(Component) {

    return function useAuth() {

        const {user,loading,error} = useUser()
        if(loading && user === undefined) {
            return <div>Loading...</div>
        }
        if(error || user === null) {
            return <div>Opps something has happend, please try again later</div>
        }
        if(user === undefined) {
            return <Navigate to="/auth/sign-in"/>
        }

        return <Component/>
    }
}