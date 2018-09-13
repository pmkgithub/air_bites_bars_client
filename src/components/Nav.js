import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo_w_text from '../images/abnb_logo_w_text_red_300.png';
import logo from '../images/abnb_logo_red.png';
import './nav.css';

const Nav = ({page, linkTo, text}) => {
 return (
   <div className="nav_wrapper">
     {page === 'splash'? <div></div> : <img className="nav_full_logo" src={logo_w_text} alt="Air Bites and Bars logo"/>}
     <div className="nav_links">
       <Link className="nav_link_tag" to={linkTo} style={{ textDecoration: 'none' }}>
         <img className="nav_link_logo" src={logo} alt="Air Bites and Bars logo"/>
         <span className="nav_link_text" >{text}</span>
       </Link>
     </div>
   </div>
 )
};

Nav.propTypes = {
  page: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Nav;