import React, { useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import NavLogin from "./components/nav-login";
import { Authcontext } from "./context/auth-context";
import { UserAuth } from "./hooks/Auth-houks";
import ListEvenement from "./pages/liste-evenement";
import Login from "./pages/login";
import AjouEvenement from "./pages/ajout-evenement";
import NavBar from "./components/nav-bar";

function App() {
  const { user, token, login, logout } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={ListEvenement} />
        <Route path="/ajout-evenement" component={AjouEvenement} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Login} />
      </React.Fragment>
    );
  }
  return (
    <div>
      <Authcontext.Provider
        value={{ user: user, token: token, login: login, logout: logout }}
      >
        <BrowserRouter>
          {!token ? <NavLogin /> : <NavBar/> }
          {routes}
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
}

export default App;
