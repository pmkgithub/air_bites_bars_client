import React from 'react';
import Nav from './Nav';
import img01 from '../images/about/map_ui_01.png'
import img02 from '../images/about/map_ui_02.png'
import img03_01 from '../images/about/map_ui_03_01.png'
import img03_02 from '../images/about/map_ui_03_02.png'
import img04_01 from '../images/about/map_ui_04_01.png'
import img04_02 from '../images/about/map_ui_04_02.png'
import img05_01 from '../images/about/map_ui_05_01.png'
import img05_02 from '../images/about/map_ui_05_02.png'
import img06 from '../images/about/map_ui_06.png'
import img07 from '../images/about/map_ui_07.png'
import img08 from '../images/about/map_ui_08.png'
import img09 from '../images/about/map_ui_09.png'

import './about.css';

const About = (props) => {
  return (
    <div className="about_wrapper">
      <Nav page={'about'} linkTo={'/dashboard'} text={'Dashboard'}/>

      <section className="about_search">
        <div className="about_section_title">Searching Venues:</div>
        <article className="about_article">
          <div className="about_article_title">App Load:</div>
          <hr/>
          <p>For App to work, User must "Allow" the Browser to "Know your location".&nbsp;&nbsp;This permission is found in the Browser's Settings Panel.</p>
          <p>When App Loads, Bites (Restaurant) Venues, within a 2 mile radius, display.</p>
          <img className="about_img" src={img01} alt="on app load restaurants venues display"/>
        </article>
        <article className="about_article">
          <div className="about_article_title">Click Marker / Venue Card:</div>
          <hr/>
          <p>Click a Marker; its InfoWindow opens and the corresponding Venue card scrolls into view.  Whoa, that is cool!</p>
          <p>Conversely, when a Venue card is clicked, the corresponding Marker's InfoWindow opens.</p>
          <img className="about_img" src={img02} alt="click map marker or click venue card to show details"/>
        </article>
        <article className="about_article">
          <div className="about_article_title">Bites / Bars Radio Buttons:</div>
          <hr/>
          <p>Clicking either radio button will toggle displayed Venues from Bites to Bars on Current Location, and vice-versa.</p>
          <p>Here, only Bites venues show.</p>
          <img className="about_img" src={img03_01} alt="click bites radio button to display restaurant venues"/>
          <p>And now, only Bar venues display.</p>
          <img className="about_img" src={img03_02} alt="click bars radio button to display bar venues"/>
        </article>
        <article className="about_article">
          <div className="about_article_title">Pan With Fetching:</div>
          <hr/>
          <p>"Pan with Fetching" is the default behavior.  When User pans the map, the Venues update automatically.</p>
          <p>This feature is especially useful when on a road trip.&nbsp;&nbsp;Pan the road you are traveling to see upcoming Bites and Bars along your route.</p>
          <p>It is also a fun way to explore an unfamiliar area for Restaurant and Bar locations.</p>
          <img className="about_img" src={img04_01} alt="pan without fetching is default behavior"/>
          <p>Here, the User has panned along his route to see upcoming Venues.&nbsp;&nbsp;Hmmm, where should I stop to eat?  Where I am currently, or down the road?</p>
          <img className="about_img" src={img04_02} alt="venue markers update as map is moved or panned"/>
        </article>
        <article className="about_article">
          <div className="about_article_title">Pan Without Fetching</div>
          <hr/>
          <p>Checking "Pan w/o Fetching" is a convenient feature which allows the User to Pan (and Zoom In/Out) while preserving the currently displayed Venues.</p>
          <p>Suppose you want to explore the currently loaded set of Venues in greater detail - in this scenario, you want to explore Marker 43.</p>
          <img className="about_img" src={img05_01} alt="pan without fetching is a convenience feature"/>
          <p>Here, we panned, zoomed and clicked Marker 43.</p>
          <img className="about_img" src={img05_02} alt="click pan with fetching to prevent new venue markers from loading when moving the map"/>
        </article>
      </section>

      <hr/>

      <section className="about_new_level_search">
        <div className="about_section_title">Take it to the Next Level:</div>
        <article className="about_article">
          <div className="about_article_title">Starting an Advanced Search:</div>
          <hr/>
          <p>This is where things really get FUN!</p>
          <p>Click "Pan w/o Zoom" and "Toggle Crosshairs" check-boxes.</p>
          <img className="about_img" src={img06} alt="start an advanced search by clicking pan without fetching"/>
        </article>
        <article className="about_article">
          <div className="about_article_title">Pan to Desired Location:</div>
          <hr/>
          <p>You can pan any where on the map.  Try exploring a city you plan to visit, or exploring a city in a foreign country.</p>
          <img className="about_img" src={img07} alt="pan to desired location on map"/>
        </article>
        <article className="about_article">
          <div className="about_article_title">Load New Venues:</div>
          <hr/>
          <p>Un-check "Pan w/o Fetching".  Grab Map and give it a nudge.&nbsp;&nbsp;New Venues display in the new Location.</p>
          <img className="about_img" src={img08} alt="uncheck pan without fetching to display venues in the new location"/>
        </article>
      </section>

      <hr/>

      <section className="about_reset">
        <div className="about_section_title">Resetting View:</div>
        <article className="about_article">
          <div className="about_article_title">Go back to Current Location:</div>
          <hr/>
          <p>Click "Recenter to My Location" button to return map to your current location view.</p>
          <img className="about_img" src={img09} alt="click recenter to my location button to return map to your current location view"/>
        </article>
      </section>
    </div>
  )
};

export default About;