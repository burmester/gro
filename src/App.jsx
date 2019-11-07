import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { Container } from 'reactstrap';

import history from './utils/history';
import GlobalState from './context/GlobalState';

import Start from './pages/Start';
import Settings from './pages/Settings';

import Header from './components/Header';

export default class App extends Component {
    render () {
        return (
            <GlobalState>
                <Router history={history}>
                    <Container>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Start} />
                            <Route exact path="/settings" component={Settings} />
                        </Switch>
                    </Container>
                </Router>
            </GlobalState>
        )
    }
}
