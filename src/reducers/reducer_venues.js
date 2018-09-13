import {
  FETCH_VENUES_REQUEST,
  FETCH_VENUES_SUCCESS,
  FETCH_VENUES_ERROR,
  SET_ACTIVE_VENUE,
  MARKER_CLICK_CHANGE_STATE,
  SET_IS_GEOLOCATING,
  SET_GEOLOCATE_COORDS,
  SET_MAP_CENTER_COORDS,
  SET_FETCH_BY,
  SET_PAN_WO_FETCH,
  SET_RECENTER_MY_LOCATION
} from "../actions/action_venues";

const INITIAL_STATE = {
  venues: [],
  activeVenue: {},
  gotVenues: true,  // flag set in FETCH_VENUES_SUCCESS.
  isFetching: false,
  err: '',
  markerClickChangeStateBool: false,
  isGeolocating: false,
  mapCenterCoords: {},
  fetchBy: 'bread', // default Radio Button is "Bread"
  panWOFetch: false,
  recenterMyLocation: false,
  // toggleCrosshairs: false
};

export default (state = INITIAL_STATE, action) => {

  switch(action.type) {

    case FETCH_VENUES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case FETCH_VENUES_SUCCESS:

      const fetchedVenues = action.venuesData.response.groups[0].items;

      // Process response to cull only what we need from FourSquare response object.
      let processedVenues = [];

      fetchedVenues.forEach((venue) => {
        let pvObj = {};
        pvObj.id = venue.venue.id;
        pvObj.name = venue.venue.name;
        pvObj.address = venue.venue.location.address;
        pvObj.city = venue.venue.location.city;
        pvObj.state = venue.venue.location.state;
        pvObj.postalCode = venue.venue.location.postalCode;
        pvObj.cuisine = venue.venue.categories[0].shortName;
        pvObj.lat = venue.venue.location.lat;
        pvObj.lng = venue.venue.location.lng;
        processedVenues.push(pvObj);
      });

      // Compare func for .sort() - sorts ascending.
      const compare = (a, b) => {
        if (a.name < b.name ) { return -1 }
        if (a.name > b.name ) { return 1 }
        return 0;
      };

      // Sort Processed Venues - makes life nice.
      processedVenues.sort(compare);

      // Add index to sorted venues.
      // Needed for the Marker InfoWindow logic.
      processedVenues.forEach((venue, index) => {
        venue.index = index;
      });

      return {
        ...state,
        venues: processedVenues,
        activeVenue: processedVenues[0],
        gotVenues: processedVenues.length > 0,
        isFetching: false,
        err: ""
      };

    case FETCH_VENUES_ERROR:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };

    case SET_ACTIVE_VENUE:
      return {
        ...state,
        activeVenue: action.activeVenue
      };

    case MARKER_CLICK_CHANGE_STATE:
      return {
        ...state,
        markerClickChangeStateBool: action.bool
      };

    case SET_IS_GEOLOCATING:
      return {
        ...state,
        isGeolocating: action.bool
      };

    case SET_GEOLOCATE_COORDS:
      return {
        ...state,
        geolocateCoords: action.coords
      };

    case SET_MAP_CENTER_COORDS:
      return {
        ...state,
        mapCenterCoords: action.coords
      };

    case SET_FETCH_BY:
      return {
        ...state,
        fetchBy: action.fetchBy
      };

    case SET_PAN_WO_FETCH:
      return {
        ...state,
        panWOFetch: action.bool
      };

    case SET_RECENTER_MY_LOCATION:
      return {
        ...state,
        recenterMyLocation: action.bool
      };

    default:
      return state;
  }
}