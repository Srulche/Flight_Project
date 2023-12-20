import "./auth.css";
import * as userService from "../../Services/userService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";


export default function Login() {
  //const {signIn} = useUser()
  const [error, setError] = useState();
  const nav = useNavigate();

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userDetails = Object.fromEntries(formData.entries());
    try {
      const response = await userService.signUp(userDetails);
      if (response.status !== 201) {
        // failed to register
        setError(response.message || response.data);
        return;
      }
      message.success("Successfully signed up, you may login")
      nav("/auth/sign-in");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div>
      <form onSubmit={onRegisterSubmit} className="auth-form">
        <label htmlFor="fullName">Full name</label>
        <input
          onChange={() => {
            if (error) setError(null);
          }}
          id="fullName"
          placeholder="Enter full name"
          type="text"
          name="fullName"
        />

        <label htmlFor="dateOfBirth">Date of birth</label>
        <input
          onChange={() => {
            if (error) setError(null);
          }}
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
        />

        <label htmlFor="address">Address</label>
        <input
          onChange={() => {
            if (error) setError(null);
          }}
          id="address"
          type="text"
          name="address"
        />

        <label htmlFor="email">Email address</label>
        <input
          onChange={() => {
            if (error) setError(null);
          }}
          id="email"
          name="email"
          placeholder="Enter email address"
          type="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={() => {
            if (error) setError(null);
          }}
          id="password"
          name="password"
          placeholder="Enter password"
          type="password"
        />
        <div
          style={{
            padding: "1rem",
            height: "20px",
            display: "block",
            opacity: error ? 1 : 0,
            color: "#bd3333",
          }}
        >
          {error}
        </div>
        <button>Register</button>
        <span>
          Already have an account? <Link to="/auth/sign-in">Sign in now</Link>
        </span>
      </form>
    </div>
  );
}
