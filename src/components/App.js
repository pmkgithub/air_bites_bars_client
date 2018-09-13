import React, { Component } from 'react';
// import Nav from './Nav';
import './App.css';
// Font Awesome - BEGIN
import { library as faLibrary} from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // do this in Component
import { faMapMarker, faSpinner } from '@fortawesome/free-solid-svg-icons';
faLibrary.add(faMapMarker, faSpinner);
// Font Awesome - END

class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}

export default App;
