import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

// 6:45:04

import './App.css';

// pages
import createProject from './dialog/createProject';
import projects from './pages/projects';
import login from './pages/login';
import signup from './pages/signup';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// components
import Navbar from './components/Navbar';

//utils
import AuthRoute from './utils/AuthRoute';

// https://material-ui.com/customization/color/
const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: blue,
    }
});

// authentication code
let authenticated = true;
// const token = localStorage.getItem('JiraToken');
// if (token) {
//     const decodeToken = jwtDecode(token);
//
//     // does token expired
//     if (decodeToken.exp * 1000 < Date.now()) {
//         window.location.href = '/login';
//         authenticated = false;
//     } else {
//         authenticated = true;
//     }
// }

function App() {
  return (
      <MuiThemeProvider theme={theme}>
          <Provider store={store}>
              <Router>
                  <Navbar/>
                  <div className='container'>
                      <Switch>
                          <Route exact path='/' component={projects}/>
                          <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
                          <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
                      </Switch>
                  </div>
              </Router>
          </Provider>
      </MuiThemeProvider>
  );
}

export default App;
