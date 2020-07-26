import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import './App.css';

// pages
import projects from "./pages/projects";
import login from "./pages/login";
import signup from "./pages/signup";

// components
import Navbar from "./components/Navbar";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";

// https://material-ui.com/customization/color/
const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: blue,
    }
});

function App() {
  return (
      <MuiThemeProvider theme={theme}>
          <div className="App">
              <Router>
                  <Navbar/>
                  <div className="container">
                      <Switch>
                          <Route exact path="/" component={projects}/>
                          <Route exact path="/login" component={login}/>
                          <Route exact path="/signup" component={signup}/>
                      </Switch>
                  </div>
              </Router>
          </div>
      </MuiThemeProvider>
  );
}

export default App;
