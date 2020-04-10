import React, { useEffect, useState, useCallback } from "react";
import { Card, CardActions, CardContent, Button } from "@material-ui/core";

import DashboardGraph from "./DashboardGraph";

//Stylesheet
import "../css/Dashboard.css";
import { getSuggestedWorkouts, addCompletedWorkout } from "../utils/api";

function MainDashboard({ userId }) {
  const [suggestedWorkouts, setSuggestedWorkouts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getSuggestedWorkouts({ id: userId });
      if (response.status === 200) {
        setSuggestedWorkouts(response.workouts);
      }
    }
    fetchData();
  }, [userId]);

  const handleAddSuggestedWorkout = useCallback(async (i) => {
    await addCompletedWorkout({ id: userId, ...suggestedWorkouts[i] });
  });

  return (
    <div className="grid-container-dashboard">
      <div className="dashboardgraphpanel">
        <div className="dashboardgraph">
          <DashboardGraph></DashboardGraph>
        </div>
      </div>
      <div className="welcomepanel">
        <div className="welcome">
          <h1 className="greeting">Hi Jackie!</h1>
          <h4 className="loggingmsg">You've logged for 5 days in a row</h4>
        </div>
      </div>
      <div className="rankingpanel">
        <Card className="rankingcard">
          <CardContent className="rankingcardcontent">
            <h4 className="rankingcardtext">You are ranked</h4>
            <h1 className="ranking">14th</h1>
            <h4 className="rankingcardtext">among your friends</h4>
          </CardContent>
        </Card>
      </div>
      <div className="burnedcalpanel">
        <Card className="burnedcalcard">
          <CardContent className="burnedcalcardcontent">
            <h4 className="burnedcalcardtext">Burned</h4>
            <h1 className="burnedcal">8500 kcal</h1>
            <h4 className="burnedcalcardtext">in the past 30 days</h4>
          </CardContent>
        </Card>
      </div>
      <div className="exercisepanel">
        <Card className="exercisecard">
          <CardContent className="exercisecardcontent">
            <h4 className="exercisecardtext">Exercised for</h4>
            <h1 className="exercise">22.8 hours</h1>
            <h4 className="exercisecardtext">in the past 30 days</h4>
          </CardContent>
        </Card>
      </div>
      <div className="suggworkouttextpanel">
        <h4 className="suggworkouttext">Suggested Workouts:</h4>
      </div>
      <div className="suggrecipetextpanel">
        <h4 className="suggrecipetext">Suggested Recipes:</h4>
      </div>
      <div className="suggestedworkoutpanel">
        <div className="suggestedworkouts">
          {suggestedWorkouts[0] && (
            <Card className="workoutcard">
              <CardContent className="workoutcardcontent">
                <div className="workoutcardtext">
                  <h4>Type: {suggestedWorkouts[0].type}</h4>
                  <h4>METs: {suggestedWorkouts[0].METs}</h4>
                  <Button onClick={() => handleAddSuggestedWorkout(0)}>
                    Add to Completed Workouts
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {suggestedWorkouts[1] && (
            <Card className="workoutcard">
              <CardContent className="workoutcardcontent">
                <div className="workoutcardtext">
                  <h4>Type: {suggestedWorkouts[1].type}</h4>
                  <h4>METs: {suggestedWorkouts[1].METs}</h4>
                  <Button onClick={() => handleAddSuggestedWorkout(1)}>
                    Add to Completed Workouts
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="suggestedrecipepanel">
        <div className="suggestedrecipes">
          <Card className="recipecard">
            <CardContent className="recipecardcontent">
              <h4 className="recipecardtext">Salmon with Edamame</h4>
            </CardContent>
          </Card>
          <Card className="recipecard">
            <CardContent className="recipecardcontent">
              <h4 className="recipecardtext">Garden Chicken Burger</h4>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
