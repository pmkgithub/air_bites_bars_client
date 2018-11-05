import React, { Component } from "react";
import Nav from "./Nav";
import GoogleMap from "./GoogleMap";
import VenuesList from "./VenuesList";
import "./dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Nav page={"dashboard"} linkTo={"/about"} text={"About"} />
        <div className="dashboard_map_venue_list_wrapper">
          <GoogleMap />
          <VenuesList />
        </div>
      </div>
    );
  }
}

export default Dashboard;
