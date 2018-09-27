import { combineReducers } from 'redux';
import VenuesReducer from './reducer_venues';

export default combineReducers({
  venueData: VenuesReducer
});