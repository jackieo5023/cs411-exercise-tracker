import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import ExerciseGraph from "./ExerciseGraph";

//Stylesheet
import "../css/Exercise.css";

function ExercisePage() {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div class="grid-container-ex">
      <div class="A-ex">
        <div class="E-ex">
          <div class="I-ex">
            <Card className="workoutcardex">
              <CardContent className="workoutcardcontentex">
                <h4 className="workoutcardtextex">Basic Weight Training</h4>
              </CardContent>
            </Card>
          </div>
          <div class="J-ex">
            <Card className="workoutcardex">
              <CardContent className="workoutcardcontentex">
                <h4 className="workoutcardtextex">Light Swimming</h4>
              </CardContent>
            </Card>
          </div>
          <div class="K-ex">
            <Card className="workoutcardex">
              <CardContent className="workoutcardcontentex">
                <h4 className="workoutcardtextex">Beginner's Cardio</h4>
              </CardContent>
            </Card>
          </div>
          <div class="L-ex">
            <Card className="workoutcardex">
              <CardContent className="workoutcardcontentex">
                <h4 className="workoutcardtextex">Intro to Yoga</h4>
              </CardContent>
            </Card>
          </div>
        </div>
        <div class="F-ex">
          <div className="suggworkouttextpanelex">
            <h4 className="suggworkouttextex">Suggested Workouts</h4>
          </div>
          <div class="exercisegraphpanel">
            <div className="exercisegraph">
              <ExerciseGraph></ExerciseGraph>
            </div>
          </div>
        </div>
      </div>
      <div class="B-ex">
        <div class="exercisetargetpanel">
          <Card className="exercisetargetcard">
            <CardContent className="exercisetargetcardcontent">
              <h4 className="exercisetargetcardtext">Daily Target:</h4>
              <h1 className="exercisetarget">8500 kcal</h1>
              <h4 className="exercisetargetcardtext">Burned</h4>
            </CardContent>
          </Card>
        </div>
        <div class="D-ex">
          <h4 className="suggworkouttextex">Add a Workout</h4>
          <div class="workouttextbox">
            <form noValidate autoComplete="off">
              <TextField
                className="textbox"
                id="outlined-basic"
                label="Duration (in minutes)"
                placeholder="30"
                required
                id="outlined-required"
                variant="outlined"
                style={{ width: "250px" }}
              />
            </form>
          </div>
          <div class="workoutdropdown">
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Workout Type *
              </InputLabel>
              <Select
                className="dropdownbox"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                required
                value={type}
                onChange={handleChange}
                label="Workout Type *"
                style={{ width: "250px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Running</MenuItem>
                <MenuItem value={2}>Swimming</MenuItem>
                <MenuItem value={3}>Cycling</MenuItem>
                <MenuItem value={4}>Yoga</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div class="workoutbuttongroup">
            <Button class="workoutbutton">Submit Workout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExercisePage;
