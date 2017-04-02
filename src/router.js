import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import Splash from './pages/Splash';
import App from "./pages/App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Game from "./pages/Game";
import Status from "./pages/Status";
import Deal from "./pages/Deal";
import Travel from "./pages/Travel";
import Guns from "./pages/Guns";
import Clothing from "./pages/Clothing";
import Hospital from "./pages/Hospital";
import Finances from "./pages/Finances";
import Duel from "./pages/Duel";
import About from "./pages/About";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";
import RequireGameInit from "./components/RequireGameInit";

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash} />
      <Route path = "/home" component={RequireAuth(Home)} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/about" component={About} />
      <Route path="/help" component={RequireAuth(Help)} />
      <Route path="/game" component={RequireAuth(Game)} />
      <Route path="/game/status" component={RequireAuth(RequireGameInit(Status))} />
      <Route path="/game/deal" component={RequireAuth(RequireGameInit(Deal))} />
      <Route path="/game/travel" component={RequireAuth(RequireGameInit(Travel))} />
      <Route path="/game/guns" component={RequireAuth(RequireGameInit(Guns))} />
      <Route path="/game/clothing" component={RequireAuth(RequireGameInit(Clothing))} />
      <Route path="/game/hospital" component={RequireAuth(RequireGameInit(Hospital))} />
      <Route path="/game/finances" component={RequireAuth(RequireGameInit(Finances))} />
      <Route path="/game/duel" component={RequireAuth(RequireGameInit(Duel))} />
      <Route path="*" component={RequireAuth(NotFound)} />
    </Route>
  </Router>
);

// export
export { router };
