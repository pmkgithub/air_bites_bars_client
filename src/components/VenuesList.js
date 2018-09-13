import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setActiveVenue,
  setFetchBy,
  setPanWOFetch,
  setRecenterMyLocation
} from "../actions/action_venues";
import './venueList.css';

class VenuesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      radioValue: 'bites',
      checkboxCheck: false
    }
  }

  renderVenues() {

    return this.props.venues.map((venue, index) => {
      const count = index + 1;
      const id = venue.id;
      const venueName = venue.name;
      const address = venue.address;
      const city = venue.city;
      const state = venue.state;
      const zip = venue.postalCode;
      const cuisine = venue.cuisine;
      const lat = venue.lat;
      const lng = venue.lng;

      const venueWrapperClass = `venue_wrapper ${venue === this.props.activeVenue ? 'is_active': ''}`;
      const venueDesc = `${this.state.radioValue === 'bites' ? 'Cuisine:' : 'Bar Type: '} ${cuisine}`;
      // const getDirectionsUrl = `https://www.google.com/maps/dir/Current+Location/${lat},${lng}`;
      // NOTE: dirflg values: d = drive, h = avoid hwy, t = avoid tolls, w = walk, b= bike, r = public trans (not avail in some markets.
      const getDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&dirflg=d`;

      return (
          <div
            key={index} id={`venue_${id}`}
            className={venueWrapperClass}
            onClick={() => this.props.setActiveVenue(venue) }
          >
            <div className="venue_name">{venueName} ({count})</div>
            <div className="venue_address_cuisine_wrapper">
              <div className="venue_address_wrapper">
                <div className="venue_address1">{address}</div>
                <div className="venue_address2">
                  <span className="venue_city">{`${city}, `}</span>
                  <span className="venue_state">{`${state} `}</span>
                  <span className="venue_zip">{zip}</span>
                </div>
                <div className="venue_cuisine">{venueDesc}</div>
                <a href={getDirectionsUrl} target="_blank">Get Directions</a>
              </div>
            </div>
          </div>
      )
    })
  }

  renderNoVenuesMessage() {
    return (
      <div className="no_venues_message_wrapper">
        <div>No Venues Found</div>
        <div>Try Panning Map</div>
      </div>
    )
  }

  handleRadioOnChange(e) {
    this.setState({
      radioValue: e.target.value
    });

    // this.props.fetchBy used by onMapDragend in GoogleMap.js.
    // The fetchVenue call in GoogleMap.js shouldComponentUpdate is handled by nextProps.fetchBy.
    this.props.setFetchBy(e.target.value);

  }

  handleCheckboxOnChange(e) {
    this.setState({
      checkboxCheck: e.target.checked
    });

    // Used in GoogleMap.js
    this.props.setPanWOFetch(e.target.checked);

    // Disable Radios when Pan WO Fetch is checked,
    // Or Enable Radios when Pan WO Fetch is not checked.
    document.getElementById("radio_bites").disabled = e.target.checked;
    document.getElementById("radio_bars").disabled = e.target.checked;
  }

  recenter() {
    // Enable Radios.
    document.getElementById("radio_bites").disabled = false;
    document.getElementById("radio_bars").disabled = false;

    this.setState({
      checkboxCheck: false
    });

    this.props.setPanWOFetch(false);         // flip Pan w/o Fetch.
    this.props.setRecenterMyLocation(true);  // for GoogleMap.js shouldComponentMount().
  }

  render() {
    return (
      <div className="venues_list_wrapper">
        <div className="venues_list_header_filters_wrapper">
          <h2 className="venues_list_header">Venues:</h2>
          <form className="venues_list_filters_form">
            <div className="filter_input">
              <input
                id="radio_bites"
                type="radio"
                name="search_cat"
                value="bites"
                checked={this.state.radioValue === 'bites'}
                onChange={e => this.handleRadioOnChange(e)}
              />
              <label htmlFor="radio_bites">Bites</label>
            </div>
            <div className="filter_input">
              <input
                id="radio_bars"
                type="radio"
                name="search_cat"
                value="bars"
                checked={this.state.radioValue === 'bars'}
                onChange={e => this.handleRadioOnChange(e)}
              />
              <label htmlFor="radio_bars">Bars</label>
            </div>
            <div className="filter_input">
              <input
                id="checkbox_pan_nofetch"
                type="checkbox"
                name="checkbox_pan_nofetch"
                value="pan_wo_fetch"
                checked={this.state.checkboxCheck}
                onChange={e => this.handleCheckboxOnChange(e)}
              />
              <label htmlFor="checkbox_pan_nofetch">Pan w/o Fetching</label>
            </div>
          </form>
        </div>
        <div
          className="recenter"
          onClick={() => this.recenter()}
        >Recenter to My Location</div>
        <div className="venues_list">
          {!this.props.gotVenues && this.renderNoVenuesMessage()}
          {this.renderVenues()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    venues: state.venueData.venues,
    activeVenue: state.venueData.activeVenue,
    gotVenues: state.venueData.gotVenues,
    geolocateCoords: state.venueData.geolocateCoords,
  }
};

export default connect(mapStateToProps, {
  setActiveVenue,
  setFetchBy,
  setPanWOFetch,
  setRecenterMyLocation
})(VenuesList);