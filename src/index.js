import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-xxxxxxx-xx', {
  testMode:true
});

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
