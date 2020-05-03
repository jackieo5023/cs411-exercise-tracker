import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Modal,
  Paper,
} from "@material-ui/core";

import DashboardGraph from "./DashboardGraph";

//Stylesheet
import "../css/Dashboard.css";
import {
  getSuggestedWorkouts,
  addCompletedWorkout,
  getSuggestedRecipes,
  addRecipe,
  getPerson,
} from "../utils/api";

function MainDashboard({ userId }) {
  const [name, setName] = useState("");
  const [suggestedWorkouts, setSuggestedWorkouts] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getPerson({ id: userId });
      if (response.status === 200) {
        setName(response.person.firstName);
      }

      const workoutResponse = await getSuggestedWorkouts({ id: userId });
      if (workoutResponse.status === 200) {
        setSuggestedWorkouts(workoutResponse.workouts);
      }

      const recipeResponse = await getSuggestedRecipes({ id: userId });
      if (recipeResponse.status === 200) {
        setSuggestedRecipes(recipeResponse.food);
      }
    }
    fetchData();
  }, [userId]);

  const handleAddSuggestedWorkout = useCallback(
    async (i, d) => {
      await addCompletedWorkout({
        id: userId,
        ...suggestedWorkouts[i],
        duration: d,
      });
      setIsOpen(null);
    },
    [suggestedWorkouts, userId]
  );
  const handleAddSuggestedRecipe = useCallback(
    async (i) => {
      await addRecipe({ id: userId, ...suggestedRecipes[i] });
    },
    [suggestedRecipes, userId]
  );

  const handleOpenModal = useCallback((i) => setIsOpen(i), []);
  const handleCloseModal = useCallback(() => setIsOpen(null), []);

  return (
    <div className="grid-container-dashboard">
      <Modal open={isOpen !== null} onClose={handleCloseModal}>
        <Paper elevation={3} className="workout-modal">
          <h2 className="workout-modal-header">
            How long are you doing this exercise for?
          </h2>
          <TextField
            className="textbox"
            id="outlined-basic"
            label="Duration (in minutes)"
            placeholder="30"
            required
            variant="outlined"
            style={{ width: "250px" }}
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            type="number"
          />
          <div className="workout-modal-button">
            <Button onClick={() => handleAddSuggestedWorkout(isOpen, duration)}>
              Submit
            </Button>
          </div>
        </Paper>
      </Modal>
      <div className="dashboardgraphpanel">
        <div className="dashboardgraph">
          <DashboardGraph></DashboardGraph>
        </div>
      </div>
      <div className="welcomepanel">
        <div className="welcome">
          <h1 className="greeting">Hi {name}!</h1>
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
          {suggestedWorkouts.map((workout, idx) => (
            <Card className="workoutcard">
              <CardContent className="workoutcardcontent">
                <div className="workoutcardtext">
                  <h4>Type: {workout.type}</h4>
                  <h4>METs: {workout.METs}</h4>
                  <h4>
                    Equipment:{" "}
                    {workout.equipment.length === 0
                      ? "None"
                      : workout.equipment.join(", ")}
                  </h4>
                  <Button onClick={() => handleOpenModal(idx)}>
                    Add to Completed Workouts
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="suggestedrecipepanel">
        <div className="suggestedrecipes">
          {suggestedRecipes.map((recipe, idx) => (
            <Card className="recipecard">
              <CardContent className="recipecardcontent">
                <div className="recipecardtext">
                  <h4>Name: {recipe.recipeName}</h4>
                  <h4>Protein: {recipe.protein}g</h4>
                  <h4>Calories: {recipe.calories}</h4>
                  <h4>Made By: {recipe.firstName}</h4>
                  <Button onClick={() => handleAddSuggestedRecipe(idx)}>
                    Add to Meals
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
