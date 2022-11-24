import React from "react";
import "./index.css";
import App from "./App";
import ProductContext from "./context/MyContext";
import { BrowserRouter as Router } from "react-router-dom";
import {render} from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {reducers} from './reducers/index'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = document.getElementById('root');
render(
  <React.StrictMode>
    <Provider store={store}> 
    <ProductContext>
      <Router>
        <App />
      </Router>
    </ProductContext>
    </Provider>
  </React.StrictMode>,
  root
);
