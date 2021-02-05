import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Container from "@material-ui/core/Container";
import jwtDecode from 'jwt-decode';

import './App.css';

// pages
import projects from './pages/projects';
import login from './pages/login';
import signup from './pages/signup';
import project from './pages/project';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// components
import Navbar from './components/Navbar';

//utils
import AuthRoute from './utils/AuthRoute';

// authentication code
let authenticated = false;
const token = localStorage.getItem('JiraToken');
if (token) {
  const decodeToken: any = jwtDecode(token);

  // does token expired
  if (decodeToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

// https://material-ui.com/customization/color/
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue
  }
});

const App = () => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar/>
          <Container className="container">
            <Switch>
              <Route exact path='/' component={projects}/>
              <Route exact path='/project/:projectKey' component={project} />
              <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
              <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
            </Switch>
          </Container>
        </Router>
      </Provider>
    </ThemeProvider>
);

export default App;
