import React from "react";
import { Switch, Route } from "react-router-dom";

import Employees from "./pages/Employees";
import New from "./pages/New";
import Edit from "./pages/Edit";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Employees} />
      <Route path="/new" component={New} />
      <Route path="/edit/:id" component={Edit} />
    </Switch>
  );
}

export default Routes;
