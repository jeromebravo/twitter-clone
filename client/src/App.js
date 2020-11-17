import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import Main from './components/Main';
import store from './store';
import setTokenHeader from './utilities/setTokenHeader';
import {loadUser, logout} from './actions/auth';
import './App.css';

if(localStorage.token) {
    setTokenHeader(localStorage.token);
    store.dispatch(loadUser());
} else {
    store.dispatch(logout());
}

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Main />
            </Router>
        </Provider>
    );
}

export default App;