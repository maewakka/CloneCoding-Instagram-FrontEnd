import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createLogger} from "redux-logger/src";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./redux/modules/config";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const logger = createLogger();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

export const Static_Base_Url = "http://localhost:8080/api"

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
