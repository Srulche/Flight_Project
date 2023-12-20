import React, { useEffect, useState } from "react";
import "./footer.css";
import video2 from "../../Assets/video (2).mp4";
import { FiSend } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
//import { FiChevronRight } from "react-icons/fi";

import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [email, setEmail] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail("")
    console.log("Email submitted:" , email)
  }

  return (
    <section className="footer" id="footer">
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>
      <div className="secContent container">
        <div className="contactDiv flex">
          <div data-aos="fade-up" className="text">
            <small>KEEP IN TOUCH</small>
            <h2>Travel with us</h2>
          </div>
          <div className="inputDiv flex">
            <input
              data-aos="fade-up"
              type="text"
              placeholder="Enter Email Address"
              value={email}
              onChange={handleEmailChange}
            />
            <button data-aos="fade-up" className="btn flex" type="submit" onClick={handleSubmit}>
              SEND <FiSend className="icon" />
            </button>
          </div>
        </div>
        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                <MdOutlineTravelExplore className="icon" /> About Travel.
              </a>
            </div>
            <div data-aos="fade-up" className="footerParagraph">
              Welcome to the skies of boundless possibilities, where our flight
              website is more than a ticket – it's a portal to dreams. Embark on
              a journey with us, where every flight is a story waiting to
              unfold. From the exhilarating takeoff to the gentle descent, our
              wings carry tales of adventure, discovery, and the magic of
              exploration. At the heart of our airline, we don't just connect
              destinations; we connect people to their passions and aspirations.
              Soaring through the clouds, we invite you to join us in the dance
              of the skies, where each flight is a symphony of elegance and
              efficiency. Our commitment goes beyond miles; it's about crafting
              moments that linger long after the landing. Discover a world where
              the horizon is just a beginning, and the destination is but a
              chapter. Whether you're a seasoned traveler or taking flight for
              the first time, our wings are wide open to embrace you. This is
              more than a journey; it's an odyssey of experiences waiting to be
              written. Welcome to our flight family, where the extraordinary
              begins at 30,000 feet.
            </div>
            <div data-aos="fade-up" className="footerSocials flex">
              <AiOutlineTwitter className="icon" />
              <AiFillYoutube className="icon" />
              <AiFillInstagram className="icon" />
              <FaTripadvisor className="icon" />
            </div>
          </div>
          <div className="footerLinks grid">
            {/* Group One */}

            <div
              data-aos="fade-up"
              data-aos-duration="5000"
              className="linkGroup"
            >
              {/*<span className="groupTitle">LAST MINUTE</span>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                London
              </li>
              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Europe
  </li>*/}
            </div>
          </div>
          <div className="footerDiv flex">
            <small>BEST TRAVEL WEBSITE THEME</small>
            <small>COPYRIGHTS RESERVED - ISRATECH 2023</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
