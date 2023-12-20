import { Link, Navigate, useNavigate } from "react-router-dom";
import "./auth.css";
import { useUser } from "../../Context/UserContext";
import { message } from "antd";
export default function Login() {
  const nav = useNavigate();
  const { error, user, signIn, loading, setError } = useUser();
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userDetails = Object.fromEntries(formData.entries());

    const token = await signIn(userDetails);
    if (token) {
      nav("/");
      message.success("Successfully signed in, you may freely browse all our content")
    }
  };

  if (user) {
    // user is already logged in
    return <Navigate to="/auth/profile" />;
  }

  return (
    <div>
      <form onSubmit={onLoginSubmit} className="auth-form">
        <div>
          <label htmlFor="email">Email address</label>
          <input
            onChange={() => {
              if (error) setError(null);
            }}
            placeholder="Enter email address"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={() => {
              if (error) setError(null);
            }}
            placeholder="Enter password"
            type="password"
            name="password"
            id="password"
          />
        </div>
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
        <button>Login</button>
        <span>
          Dont have an account? <Link to="/auth/sign-up">Sign up now</Link>
        </span>
      </form>
    </div>
  );
}
