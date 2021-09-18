import React, { useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import NavLogin from "./components/nav-login";
import { Authcontext } from "./context/auth-context";
import { UserAuth } from "./hooks/Auth-houks";
import ListEvenement from "./pages/evenement/liste-evenement";
import Login from "./pages/login";
import AjouEvenement from "./pages/evenement/ajout-evenement";
import NavBar from "./components/nav-bar";
import Signup from "./pages/signup";
import UpdateEvenement from "./pages/evenement/update-evenement";
import ListBonPlan from "./pages/bonPlan/liste-bonPlan";
import AjoutBonPlan from "./pages/bonPlan/ajout-bonPlan";
import UpdateBonPlan from "./pages/bonPlan/update-bonPlan";
import ListeTransports from "./pages/transport/liste-transport";
import AjoutTransport from "./pages/transport/ajout-Transport";
import UpdateTransport from "./pages/transport/updateTransport";
import Profile from "./pages/profile/profile";

function App() {
  const { user, token, login, logout } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={ListEvenement} />
        <Route path="/ajout-evenement" component={AjouEvenement} />
        <Route path="/update-evenement/:id" component={UpdateEvenement} />
        <Route path="/liste-BonPlan" component={ListBonPlan} />
        <Route path="/ajout-BonPlan" component={AjoutBonPlan} />
        <Route path="/update-BonPlan/:id" component={UpdateBonPlan} />
        <Route path="/liste-transport" component={ListeTransports} />
        <Route path="/ajout-transport" component={AjoutTransport} />
        <Route path="/update-transport/:id" component={UpdateTransport} />
        <Route path="/update-profile" component={Profile} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Login} />
        <Route path="/signup"  component={Signup} />
      </React.Fragment>
    );
  }
  return (
    <div>
      <Authcontext.Provider
        value={{ user: user, token: token, login: login, logout: logout }}
      >
        <BrowserRouter>
          {!token ? <NavLogin /> : <NavBar /> }
          {routes}
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
}

export default App;
