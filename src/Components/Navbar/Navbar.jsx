import React, { useCallback, useState } from "react";
import "./navbar.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
const Navbar = () => {
  const [active, setActive] = useState("navBar");
  const { user, loading } = useUser();
  // Function to toggle navBar
  const showNav = () => {
    setActive("navBar activeNavbar");
  };
  // Function to remove navBar
  const removeNavbar = () => {
    setActive("navBar");
  };

  const AuthButton = useCallback(() => {
    if (user === undefined && loading) {
      return (
        <li className="navItem">
          <div>..</div>
        </li>
      );
    }
    if (!user) {
      return (
        <li className="navItem">
          <Link to="/auth/sign-in">Sign in</Link>
        </li>
      );
    }
    return (
      <li className="navItem">
        <Link to="/auth/profile">Profile</Link>
      </li>
    );
  }, [user, loading]);

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logodiv">
          <Link to="/" className="logo flex">
            <h1>
              {" "}
              <MdOutlineTravelExplore className="icon" /> Travel.
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <AuthButton />
            <li className="navItem">
              <a href="#most-visited" className="navLink">
                Packages
              </a>
            </li>

            <li className="navItem">
              <a href="#footer" className="navLink">
                About
              </a>
            </li>
          </ul>
          <div onClick={removeNavbar} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
