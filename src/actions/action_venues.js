// DEV - BEGIN
const ENV = process.env.REACT_APP_ENV;
const API_ROOT_URL = process.env.REACT_APP_API_ROOT_URL;
const FS_CLIENT_ID = process.env.REACT_APP_FS_CLIENT_ID;
const FS_CLIENT_SECRET = process.env.REACT_APP_FS_CLIENT_SECRET;
const FOOD_CAT = process.env.REACT_APP_FOOD_CAT;
const BAR_CAT = process.env.REACT_APP_BAR_CAT;

// Set locally here.
const RADIUS_2MI = `radius=${1609.34 * 2}`;
// const RADIUS_1MI = `radius=${1609.34}`;
// const RADIUS_05MI = `radius=${804.67}`;
const LIMIT_50 = 'limit=50';
// DEV - END

// PRODUCTION
// Note: in DEV, this is set to "none".
const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchVenues = (lat, lng, filter) => dispatch => {

  // Fetching Venues on app load default to Restaurant (e.g. bites search).
  let url = '';
  if(filter === 'bites') {
    if (ENV === 'DEV') {
      url = `${API_ROOT_URL}?${FS_CLIENT_ID}&${FS_CLIENT_SECRET}&v=20180323&ll=${lat},${lng}&${RADIUS_2MI}&${LIMIT_50}&${FOOD_CAT}`;
    } else {
      url = `${SERVER_BASE_URL}bites?lat=${lat}&lng=${lng}`;
    }
  }

  if(filter === 'bars') {
    if (ENV === 'DEV') {
      url = `${API_ROOT_URL}?${FS_CLIENT_ID}&${FS_CLIENT_SECRET}&v=20180323&ll=${lat},${lng}&${RADIUS_2MI}&${LIMIT_50}&${BAR_CAT}`;
    } else {
      url = `${SERVER_BASE_URL}bars?lat=${lat}&lng=${lng}`;
    }

  }

  dispatch(fetchVenuesRequest);

  // "return" so that multiple AJAX requests in Map.js works.
  return fetch(url, {
    method: "GET",
  })
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json();
    })
    .then(venuesData => {
      dispatch(fetchVenuesSuccess(venuesData))
    })
    .catch(err => {
      dispatch(fetchVenuesError(err))
    })

};

export const FETCH_VENUES_REQUEST = 'FETCH_VENUES_REQUEST';
export const fetchVenuesRequest = () => {
  return {
    type: FETCH_VENUES_REQUEST
  }
};

export const FETCH_VENUES_SUCCESS = 'FETCH_VENUES_SUCCESS';
export const fetchVenuesSuccess = (venuesData) => {
  return {
    type: FETCH_VENUES_SUCCESS,
    venuesData
  }
};

export const FETCH_VENUES_ERROR = 'FETCH_VENUES_ERROR';
export const fetchVenuesError = (err) => {
  return {
    type: FETCH_VENUES_ERROR,
    err
  }
};

export const SET_ACTIVE_VENUE = 'SET_ACTIVE_VENUE';
export const setActiveVenue = (activeVenue) => {
  return {
    type: SET_ACTIVE_VENUE,
    activeVenue
  }
};

// Hack for when same maker clicked 2 or more times in a row.
// Without hack, Venue Marker InfoWindow would not display
// when marker click 2 or more times.
// This state change will cause GoogleMap.js shouldComponentUpdate to run.
// Thus cause marker InfoWindow to display.
export const MARKER_CLICK_CHANGE_STATE = 'MARKER_CLICK_CHANGE_STATE';
export const markerClickChangeState = (bool) => {
  return {
    type: MARKER_CLICK_CHANGE_STATE,
    bool
  }
};

export const SET_IS_GEOLOCATING = 'SET_IS_GEOLOCATING';
export const setIsGeolocating = (bool) => {
  return {
    type: SET_IS_GEOLOCATING,
    bool
  }
};

export const SET_GEOLOCATE_COORDS = 'SET_GEOLOCATE_COORDS';
export const setGeolocateCoords = (coords) => {
  return {
    type: SET_GEOLOCATE_COORDS,
    coords
  }
};

export const SET_MAP_CENTER_COORDS = 'SET_MAP_CENTER_COORDS';
export const setMapCenterCoords = (coords) => {
  return {
    type: SET_MAP_CENTER_COORDS,
    coords
  }
};

export const SET_FETCH_BY = 'SET_SEARCH_BY';
export const setFetchBy = (fetchBy) => {
  return {
    type: SET_FETCH_BY,
    fetchBy
  }
};

export const SET_PAN_WO_FETCH = 'SET_PAN_WO_FETCH';
export const setPanWOFetch = (bool) => {
  return {
    type: SET_PAN_WO_FETCH,
    bool
  }
};

export const SET_RECENTER_MY_LOCATION = 'SET_RECENTER_MY_LOCATION';
export const setRecenterMyLocation = (bool) => {
  return {
    type: SET_RECENTER_MY_LOCATION,
    bool
  }
};