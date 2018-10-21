import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import bgImage from '../images/abnb_splash_02.png';
import logo_w_text from '../images/abnb_logo_w_text_red_300.png'
import './splash.css';

const bgImageStyle = {
  backgroundImage: `url(${bgImage})`
};

const Splash = (props) => {
  return (
    <div className="splash_wrapper" >
      <div className="splash_bg_image" style={bgImageStyle} ></div>
      <Nav page={"splash"} linkTo={"/about"} text={"About"}/>
      <div className="splash_start_wrapper">
        <span className="splash_start_wrapper_span">
          <Link className="splash_start_link_tag" to="/dashboard" style={{ textDecoration: 'none' }}>
            <img className="splash_start_logo" src={logo_w_text} alt="Air Bites and Bars logo"/>
            <div>start searching</div>
          </Link>
        </span>
      </div>
    </div>
  )
};

export default Splash;