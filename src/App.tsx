import { green } from '@material-ui/core/colors';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

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
import { routerPath } from './models/constants';

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
// https://github.com/minwe/jetbrains-react
// https://material-ui.com/customization/color/
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f4f5f7',
      main: '#0052cc',
      dark: '#344563',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7a869a',
      contrastText: '#5e6c84',
    },
    error: {
      main: red[400],
      dark: red[700]
    },
    warning: {
      main: orange[600]
    },
    success: {
      main: green[400],
      dark: green[700]
    }
  },
  typography: {},

});

const { defaultPath, loginPath, signupPath, projectPath } = routerPath;

const App = () => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar/>
          <Container className="container">
            <Switch>
              <Route exact path={defaultPath} component={projects}/>
              <Route exact path={projectPath} component={project} />
              <AuthRoute exact path={loginPath} component={login} authenticated={authenticated}/>
              <AuthRoute exact path={signupPath} component={signup} authenticated={authenticated}/>
            </Switch>
          </Container>
        </Router>
      </Provider>
    </ThemeProvider>
);

export default App;
