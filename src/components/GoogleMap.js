import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchVenues,
  setFetchBy,
  setActiveVenue,
  markerClickChangeState,
  setIsGeolocating,
  setGeolocateCoords,
  setMapCenterCoords,
  setPanWOFetch,
  setRecenterMyLocation
} from "../actions/action_venues";
import './googleMap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class GoogleMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      map: null,
      markers: [],
      checkboxCheck: false
    };

  }

  // Note: API AJAX calls can occur in any one of these scenarios:
  // 1) When App initially loads - found in initializeMap() -> geolocate.getCurrentPosition() -> onGeolocateSuccess()
  // 2) On a Map dragend
  // 3) User toggles between Bites/Bars radio buttons.
  // 3) If User clicks "Recenter My Location" button.
  componentDidMount() {

    this.initializeMap();

    // Handles case when User navigates to About page
    // after initial App load.
    this.props.setPanWOFetch(false);

  }

  shouldComponentUpdate(nextProps) {

    let markerIndex = null;

    // Case when Recenter Button clicked.
    if (nextProps.recenterMyLocation) {

      // Flip to turn off.
      this.props.setRecenterMyLocation(false);

      this.state.markers.forEach(marker => {
        marker.iw.close();
      });

      this.deleteMarkers();

      const { lat, lng } = this.props.geolocateCoords;

      // Fetch Venues and create Markers.
      this.props.fetchVenues(lat, lng, this.props.fetchBy)
          .then(() => {
            this.createCenterMarker(lat, lng);
            this.createVenueMarkers();
          });

      // So Radio Buttons return properly located venues.
      this.props.setMapCenterCoords(this.props.geolocateCoords);

      // Reset proper lat/lng/zoom.
      this.state.map.setCenter({lat: lat, lng: lng});
      this.state.map.setZoom(13);

      return true;
    }

    // Case when User changes radio button from bites to bars and vice-versa..
    if ( this.props.fetchBy !== nextProps.fetchBy ) {

      this.state.markers.forEach(marker => {
        marker.iw.close();
      });

      this.deleteMarkers();

      const { lat, lng } = this.props.mapCenterCoords;

      this.props.fetchVenues(lat, lng, nextProps.fetchBy)
          .then(() => {
            this.createCenterMarker(lat, lng);
            this.createVenueMarkers();
          });
    }

    // Show the correct Map Marker InfoWindow when Venue List item clicked.
    // if stmt handles case when there are no venues returned by a fetch.
    // else stmt -> fetch returned venues.
    if( !this.props.activeVenue || !nextProps.activeVenue ) {
      // Handles case where no Venues are returned from a fetch.
      markerIndex = null;
      // this.state.markers.forEach(marker => {
      //   marker.iw.close();
      // });
    } else {
      // NOTE: this.state.markers[0] is occupied by the Center Marker.
      // Thus, the ' + 1' to get the correct Marker Index.
      markerIndex = nextProps.activeVenue.index + 1;
      this.state.markers.forEach(marker => {
        marker.iw.close();
      });

      // TODO - fix or delete.
      // // This DOES works when Marker clicked 2 or more times in a row.
      // // This DOES NOT work when map is panned.
      // if (this.props.activeVenue.index === nextProps.activeVenue.index) {
      //   this.state.markers[markerIndex] &&
      //   this.state.markers[markerIndex].iw.open(this.state.map, this.state.markers[markerIndex]);
      // }
      // this.state.markers[markerIndex] &&
      // this.state.markers[markerIndex].iw.open(this.state.map, this.state.markers[markerIndex]);

      // This DOES NOT work when Marker clicked 2 or more times in a row.
      // This DOES work when map is panned.
      // // Display InfoWindow.
      if (this.props.activeVenue.index !== nextProps.activeVenue.index) {
        this.state.markers[markerIndex] &&
        this.state.markers[markerIndex].iw.open(this.state.map, this.state.markers[markerIndex]);
      }
    }

    return true;
  }

  /////////////////////////////////////////////////////////////////////////////
  // Map Logic - BEGIN
  /////////////////////////////////////////////////////////////////////////////
  initializeMap() {

    // Show USA map when App first loads and is Geolocating.
    // USA center lat, lng, zoom.
    const lat = 37;
    const lng = -96.5795;
    const zoom = 3;

    if(this.state.map !== null){return}

    this.setState({
      map: new window.google.maps.Map(this.refs.map, {
        center: {lat: lat, lng: lng},
        mapTypeControl: false,
        zoom: zoom
      })
    }, () => {
      this.state.map.addListener('dragend', function() {

        if(!this.props.panWOFetch) {

          this.state.markers.forEach(marker => {
            marker.iw.close();
          });

          this.deleteMarkers();

          const coordsString = JSON.stringify(this.state.map.getCenter());
          const coords = JSON.parse(coordsString);
          const { lat, lng } = coords;

          // We setMapCenterCoords so when User changes the Radio Buttons,
          // the new locations are fetched for current map center coords.
          this.props.setMapCenterCoords({lat: lat, lng: lng});

          const { fetchBy } = this.props;

          this.props.fetchVenues(lat, lng, fetchBy)
              .then(() => {
                this.createCenterMarker(lat, lng);
                this.createVenueMarkers();
              });
        }

      }.bind(this));

    });

    // Kick off geolocation.
    if (navigator.geolocation) {

      // Makes "Finding Your Location" spinner display.
      this.props.setIsGeolocating(true);

      // Get User's position.
      navigator.geolocation.getCurrentPosition((position) => this.onGeolocateSuccess(position), (error) => this.onGeolocateError(error));
    }

  }

  onGeolocateSuccess(position) {

    const { latitude, longitude } = position.coords;
    const lat = latitude;
    const lng = longitude;

    // We setMapCenterCoords so when User changes the Radio Buttons,
    // the new locations are fetched for current map center coords.
    let coords = {};
    coords.lat = latitude;
    coords.lng = longitude;

    this.props.setGeolocateCoords(coords);  // Used for "Recenter to My Location" button.
    this.props.setMapCenterCoords(coords);  // Set on map pans.

    // Set isGeolocating to false, remove "Finding Your Location".
    this.props.setIsGeolocating(false);

    // Set Map's lat, lng, zoom.
    this.state.map.setCenter({lat: lat, lng: lng});
    this.state.map.setZoom(13);

    // Addresses edge case when User clicks "About" link and returns to Dashboard.
    this.props.setFetchBy('bites');

    // Default initial fetch to "bites" (e.g. restaurants).
    this.props.fetchVenues(lat, lng, 'bites')
        .then(() => {
          this.createCenterMarker(lat, lng);
          this.createVenueMarkers();
        });

  }

  onGeolocateError(error) {
    console.warn(error.code, error.message);

    if (error.code === 1) {
      // they said no
    } else if (error.code === 2) {
      // position unavailable
    } else if (error.code === 3) {
      // timeout
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // Map Logic - END
  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////
  // Markers Logic - BEGIN
  /////////////////////////////////////////////////////////////////////////////
  createCenterMarker(lat, lng) {
    this.marker = new window.google.maps.Marker({
      position: {lat: lat, lng: lng},
      // animation: window.google.maps.Animation.DROP,
      label: {
        color: '#000000',
        text: `C`
      },
      icon: {
        // url: `http://maps.google.com/mapfiles/ms/icons/green-dot.png`,
        url: `http://maps.google.com/mapfiles/ms/icons/green.png`,
        scaledSize: new window.google.maps.Size(55, 55), // scaledSize - works.
        origin: new window.google.maps.Point(-1, -10), // adjusts label placement.
        // orig sample code:
        // // This marker is 20 pixels wide by 32 pixels high.
        // size: new window.google.maps.Size(20, 32),
        // // The origin for this image is (0, 0).
        // origin: new window.google.maps.Point(0, 0),
        // // The anchor for this image is the base of the flagpole at (0, 32).
        // anchor: new window.google.maps.Point(0, 32)
      },
      zIndex: 10000

    });

    // Because Center Marker is in the Markers array,
    // we need to add an InfoWindow to it
    // so the "close markers" logic doesn't crash.
    const iw = new window.google.maps.InfoWindow({
      content: `<h3>Map Center</h3>`
    });
    this.marker.iw = iw;

    // Listeners when Center Marker is clicked.
    this.marker.addListener('click', function() {
      // Hide all other InfoWindow, except for the clicked Marker.
      this.state.markers.forEach(marker => {
        marker.iw.close();
      });

      // Show the Center Marker InfoWindow.
      this.state.markers[0].iw.open(this.state.map, this.state.markers[0]);

    }.bind(this));

    // Place Center Marker in markers array.
    // NOTE: Center Marker occupies this.state.markers[0] position.
    this.setState({
      markers: [...this.state.markers, this.marker]
    });
    // Display the Markers.
    this.setMapOnAllMarkers(this.state.map);
  }

  createVenueMarkers() {

    // NOTE: this.state.markers[0] is occupied by the Center Marker.
    // Thus, the ' + 1' to get the correct Marker Index.
    // Now the proper marker in the markers array
    // will display when app first loads,
    // or when the map is panned and new venues are fetched.
    // const markerIndex = this.props.activeVenue.index + 1;

    this.props.venues.map((venue, index) => {

      const venueName = venue.name;
      const lat = venue.lat;
      const lng = venue.lng;

      this.marker = new window.google.maps.Marker({
        position: {lat: lat, lng: lng},
        // animation: window.google.maps.Animation.DROP,
        label: {
          color: '#ffffff',
          text: `${index + 1}`
        }
      });

      // Create / Add InfoWidow object to marker.
      const iw = new window.google.maps.InfoWindow({
        content: `<h3>${venueName}</h3>`
      });

      this.marker.iw = iw;

      // Listeners when Marker is clicked.
      this.marker.addListener('click', function() {

        // Hide all other InfoWindow, except for the clicked Marker.
        this.state.markers.forEach(marker => {
          marker.iw.close();
        });

        // TODO - could this be perceived by User as bad UX, desired or not?
        // Hack to make shouldComponentUpdate fire,
        // when a Venue Marker is clicked 2 or more times in a row.
        this.props.markerClickChangeState(!this.props.markerClickChangeStateBool);

        // Set the active Venue. - VenueList.js uses activeVenue to set ternary css logic.
        this.scrollToClickedVenue(venue);

      }.bind(this));

      // Place Venue Marker in markers array.
      this.setState({
        markers: [...this.state.markers, this.marker]
      });

      // // TODO - opening IW of first item in Venue List is distracting - for now disabled.
      // // When app first loads,
      // // or when the map is panned and a new set of Venues is fetched,
      // // display the Venue Marker of the first Venue List item.
      // this.state.markers[markerIndex].iw.open(this.state.map, this.state.markers[markerIndex]);
      // this.state.markers[1].iw.open(this.state.map, this.state.markers[1]);

      // "return" here prevents React console error.
      return false;
    });

    // Display the Markers.
    this.setMapOnAllMarkers(this.state.map);
  }

  setMapOnAllMarkers(map) {
    for (let i = 0; i < this.state.markers.length; i++) {
      this.state.markers[i].setMap(map);
    }
  }

  // GMA
  deleteMarkers() {
    this.setMapOnAllMarkers(null);
    this.setState({
      markers: []
    });
  }

  scrollToClickedVenue(venue) {
    const { id } = venue;

    // Setting Active Venue causes blue border on Venue List item to appear.
    // VenueList.js uses activeVenue props to set ternary css logic.
    this.props.setActiveVenue(venue);

    // Scroll to appropriate Venue List item.
    const element = document.getElementById(`venue_${id}`);
    element.scrollIntoView({
      behavior: 'smooth'
    });

  }
  /////////////////////////////////////////////////////////////////////////////
  // Markers Logic - END
  /////////////////////////////////////////////////////////////////////////////

  renderGeolocatingSpinner() {
    let wrapperClass = `map_is_geolocating_spinner_wrapper`;
    this.props.isGeolocating ? wrapperClass = wrapperClass + ' visible'
      : wrapperClass = wrapperClass + ' hidden';
    return (
      <div className={wrapperClass}>
        <div className="map_is_geolocating_spinner_message">Finding Your Location</div>
        <div className="map_is_geolocating_spinner"><FontAwesomeIcon className="map_is_geolocating_spinner fa-spin" icon="spinner"/></div>
      </div>
    )
  }

  // Crosshairs must be individual div's,
  // no wrapping div b/c wrapping div will sit on top of the map preventing
  // User from interacting with map.
  renderCrosshairVert() {
    const className = this.state.checkboxCheck ? `map_crosshairs_vert visible`
      : `map_crosshairs_vert visible  hidden`;
    return (
      <div className={className}></div>
    )
  }

  renderCrosshairHorz() {
    const className = this.state.checkboxCheck ? `map_crosshairs_horz visible`
      : `map_crosshairs_horz  hidden`;
    return (
      <div className={className}></div>
    )
  }

  handleCheckboxOnChange(e) {
    this.setState({
      checkboxCheck: e.target.checked
    });

  }

  renderMapLegend() {
    const greenMarker = 'http://maps.google.com/mapfiles/ms/icons/green.png';
    const redMarker = 'http://maps.google.com/mapfiles/ms/icons/red.png';

    return (
      <div className="map_legend_wrapper">
        <div className="map_legend_header">Map Legend</div>
        <div className="map_legend_row">
          <img className="map_legend_icon" src={greenMarker} alt=""/>
          <div className="map_legend_icon_desc">Map Center</div>
        </div>
        <div className="map_legend_row">
          <img className="map_legend_icon" src={redMarker} alt=""/>
          <div className="map_legend_icon_desc">Venue</div>
        </div>
        <div className="map_legend_row">
          <form className="map_legend_form">
            <div className="map_checkbox_input">
              <input
                id="checkbox_toggle_crosshairs"
                type="checkbox"
                name="checkbox_toggle_crosshairs"
                value="toggle_crosshairs"
                checked={this.state.checkboxCheck}
                onChange={e => this.handleCheckboxOnChange(e)}
              />
              <label htmlFor="checkbox_toggle_crosshairs">Toggle Crosshairs</label>
            </div>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="map_wrapper">
        <div className="map_container">
          <div id="map" ref="map"></div>
          {this.renderCrosshairVert()}
          {this.renderCrosshairHorz()}
        </div>
        {this.renderGeolocatingSpinner()}
        {this.renderMapLegend()}
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    venues: state.venueData.venues,
    activeVenue: state.venueData.activeVenue,
    markerClickChangeStateBool: state.venueData.markerClickChangeStateBool,
    isGeolocating: state.venueData.isGeolocating,
    geolocateCoords: state.venueData.geolocateCoords,
    mapCenterCoords: state.venueData.mapCenterCoords,
    fetchBy: state.venueData.fetchBy,
    panWOFetch: state.venueData.panWOFetch,
    recenterMyLocation: state.venueData.recenterMyLocation
  }
};

export default connect(mapStateToProps, {
  fetchVenues,
  setFetchBy,
  setActiveVenue,
  markerClickChangeState,
  setIsGeolocating,
  setGeolocateCoords,
  setMapCenterCoords,
  setPanWOFetch,
  setRecenterMyLocation
})(GoogleMap);