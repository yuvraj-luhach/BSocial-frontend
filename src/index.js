// here we connect our react application to index.html file
import React from "react";
import ReactDOM from "react-dom";

// allows us to access that store from anywhere inside of the app [initializing redux]
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// importing reducers
import reducers from "./reducers";

import "./index.css";
import App from "./App";

// used to initialize redux
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  // application successfully connected to redux, now we can start using it
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
