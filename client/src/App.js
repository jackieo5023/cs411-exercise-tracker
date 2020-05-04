import React, { useCallback, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import MainDashboard from "./components/MainDashboard";
import UserProfile from "./components/UserProfile";
import ExercisePage from "./components/ExercisePage";
import NutritionPage from "./components/NutritionPage";
import SettingsPage from "./components/SettingsPage";
import DashboardGraph from "./components/DashboardGraph";
import ExerciseGraph from "./components/ExerciseGraph";
import NutritionGraph from "./components/NutritionGraph";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id != null) {
      setUserId(id);
    }
  }, []);

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
        <Navigation
          userId={userId}
          setUserId={setUserId}
          component={
            <Switch>
              <Route
                path="/"
                exact
                render={() => showIfAuthed(<MainDashboard userId={userId} />)}
              />
              <Route
                path="/login"
                exact
                render={() => showIfNotAuthed(<Login setUserId={setUserId} />)}
              />
              <Route
                path="/register"
                exact
                render={() =>
                  showIfNotAuthed(<Register setUserId={setUserId} />)
                }
              />
              <Route
                path="/profile"
                exact
                render={(props) =>
                  showIfAuthed(<UserProfile {...props} userId={userId} />)
                }
              />
              <Route
                path="/exercise"
                exact
                render={() => showIfAuthed(<ExercisePage userId={userId} />)}
              />
              <Route
                path="/nutrition"
                exact
                render={() => showIfAuthed(<NutritionPage userId={userId} />)}
              />
              <Route
                path="/settings"
                exact
                render={() =>
                  showIfAuthed(
                    <SettingsPage userId={userId} setUserId={setUserId} />
                  )
                }
              />
              <Route
                path="/dbgraph"
                exact
                render={() => showIfAuthed(<DashboardGraph />)}
              />
              <Route
                path="/exgraph"
                exact
                render={() => showIfAuthed(<ExerciseGraph />)}
              />
              <Route
                path="/nugraph"
                exact
                render={() => showIfAuthed(<NutritionGraph />)}
              />
            </Switch>
          }
        />
      </Router>
    </>
  );
}

export default App;
