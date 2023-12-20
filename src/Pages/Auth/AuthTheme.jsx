import { Outlet } from "react-router-dom";
import "./auth.css"
export default function AuthTheme() {

    return <div className="auth-page">
        <Outlet/>
    </div>
}