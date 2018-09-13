// fetch approach
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import Splash from './components/Splash';
import Dashboard from './components/Dashboard';
import About from './components/About';
import './index.css';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Splash} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/about" component={About} />
      </App>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// // axios approach
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import ReduxPromise from 'redux-promise';
// import reducers from './reducers';
// import App from './components/App';
// import Dashboard from './components/Dashboard';
// import About from './components/About';
// import './index.css';
//
// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(ReduxPromise)
// );
//
// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App>
//         <Route exact path="/" component={Dashboard} />
//         <Route exact path="/dashboard" component={Dashboard} />
//         <Route exact path="/about" component={About} />
//
//       </App>
//     </BrowserRouter>
//   </Provider>
//   , document.getElementById('root'));