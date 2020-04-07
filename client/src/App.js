import React, { useCallback, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [userId, setUserId] = useState(null);

  const showIfAuthed = useCallback(
    (component) => {
      if (userId != null) {
        return component;
      }

      return <Redirect to="/login" />;
    },
    [userId]
  );

  const showIfNotAuthed = useCallback(
    (component) => {
      if (userId == null) {
        return component;
      }

      return <Redirect to="/" />;
    },
    [userId]
  );

  return (
    <>
      <Router>
        <Navigation userId={userId} setUserId={setUserId} />
        <Switch>
          <Route
            path="/"
            exact
            render={() => showIfAuthed(<>You logged in!</>)}
          />
          <Route
            path="/login"
            exact
            render={() => showIfNotAuthed(<Login setUserId={setUserId} />)}
          />
          <Route
            path="/register"
            exact
            render={() => showIfNotAuthed(<Register setUserId={setUserId} />)}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
