import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import configureStore, { history } from './configureStore'
import {ConnectedRouter} from "connected-react-router";

const store = configureStore()

const router = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App history={history} />
      </ConnectedRouter>
    </Provider>
    )

ReactDOM
    .render(
        router,
        document.getElementById('root')
    );

