import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
// Redux - thunk allows us to use Asychronous code in action creators and blocking the action until the asyc request is ready. 
import thunk from "redux-thunk";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import reducer from "./store/reducers/burgerBuilder";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
// import burger from './components/Burger/Burger';
import authReducer from "./store/reducers/auth";
//The process env variable is use to hide the redux devtools for a public it only visible when we are in development mode.
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  burgerBuilder : burgerBuilderReducer,
  order : orderReducer,
  auth : authReducer

})
const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));
const app=(
  <Provider store={store}>
  <Router>
    <App/>
  </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
