import React, { useCallback, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Modal,
  Paper,
} from "@material-ui/core";

import ExerciseGraph from "./ExerciseGraph";

import { addCompletedWorkout, getSuggestedWorkouts } from "../utils/api.js";

//Stylesheet
import "../css/Exercise.css";

function ExercisePage({ userId }) {
  const [type, setType] = useState("");
  const [mets, setMets] = useState(null);
  const [equipment, setEquipment] = useState("");
  const [duration, setDuration] = useState(null);
  const [suggestedWorkouts, setSuggestedWorkouts] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [modalDuration, setModalDuration] = useState(null);

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };
  const handleEquipmentChange = (event) => {
    setEquipment(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleMetsChange = (event) => {
    setMets(event.target.value);
  };

  const handleSubmit = useCallback(async () => {
    const response = await addCompletedWorkout({
      id: userId,
      type,
      METs: mets,
      equipment: equipment.split(","),
      duration,
    });
    if (response.status === 201) {
      setType("");
      setMets("");
      setEquipment("");
      setDuration("");
    }
  }, [userId, type, mets, equipment, duration]);

  const handleOpenModal = useCallback((i) => setIsOpen(i), []);
  const handleCloseModal = useCallback(() => setIsOpen(null), []);

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

  useEffect(() => {
    async function fetchData() {
      const workoutResponse = await getSuggestedWorkouts({ id: userId });
      if (workoutResponse.status === 200) {
        setSuggestedWorkouts(workoutResponse.workouts);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <div class="grid-container-ex">
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
            onChange={(e) => setModalDuration(e.target.value)}
            value={modalDuration}
            type="number"
          />
          <div className="workout-modal-button">
            <Button
              onClick={() => handleAddSuggestedWorkout(isOpen, modalDuration)}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </Modal>
      <div class="A-ex">
        {suggestedWorkouts.length > 0 && (
          <div class="E-ex">
            <div class="I-ex">
              <Card className="workoutcardex">
                <CardContent className="workoutcardcontentex">
                  <div className="workoutcardtextex">
                    <h4>Type: {suggestedWorkouts[0].type}</h4>
                    <h4>METs: {suggestedWorkouts[0].METs}</h4>
                    <h4>
                      Equipment:{" "}
                      {suggestedWorkouts[0].equipment.length === 0
                        ? "None"
                        : suggestedWorkouts[0].equipment.join(", ")}
                    </h4>
                    <Button onClick={() => handleOpenModal(0)}>
                      Add to Completed Workouts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div class="J-ex">
              <Card className="workoutcardex">
                <CardContent className="workoutcardcontentex">
                  <div className="workoutcardtextex">
                    <h4>Type: {suggestedWorkouts[1].type}</h4>
                    <h4>METs: {suggestedWorkouts[1].METs}</h4>
                    <h4>
                      Equipment:{" "}
                      {suggestedWorkouts[1].equipment.length === 0
                        ? "None"
                        : suggestedWorkouts[1].equipment.join(", ")}
                    </h4>
                    <Button onClick={() => handleOpenModal(1)}>
                      Add to Completed Workouts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div class="K-ex">
              <Card className="workoutcardex">
                <CardContent className="workoutcardcontentex">
                  <div className="workoutcardtextex">
                    <h4>Type: {suggestedWorkouts[2].type}</h4>
                    <h4>METs: {suggestedWorkouts[2].METs}</h4>
                    <h4>
                      Equipment:{" "}
                      {suggestedWorkouts[2].equipment.length === 0
                        ? "None"
                        : suggestedWorkouts[2].equipment.join(", ")}
                    </h4>
                    <Button onClick={() => handleOpenModal(2)}>
                      Add to Completed Workouts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div class="L-ex">
              <Card className="workoutcardex">
                <CardContent className="workoutcardcontentex">
                  <div className="workoutcardtextex">
                    <h4>Type: {suggestedWorkouts[3].type}</h4>
                    <h4>METs: {suggestedWorkouts[3].METs}</h4>
                    <h4>
                      Equipment:{" "}
                      {suggestedWorkouts[3].equipment.length === 0
                        ? "None"
                        : suggestedWorkouts[3].equipment.join(", ")}
                    </h4>
                    <Button onClick={() => handleOpenModal(3)}>
                      Add to Completed Workouts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
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
          <div class="workoutdropdown">
            <TextField
              className="textbox"
              id="outlined-basic"
              label="Type"
              placeholder="Swimming"
              required
              variant="outlined"
              style={{ width: "250px" }}
              value={type}
              onChange={handleTypeChange}
            />
          </div>
          <div class="workouttextbox">
            <TextField
              className="textbox"
              id="outlined-basic"
              label="METs"
              placeholder="0.0"
              required
              variant="outlined"
              style={{ width: "250px" }}
              type="number"
              value={mets}
              onChange={handleMetsChange}
            />
          </div>
          <div class="workouttextbox">
            <TextField
              className="textbox"
              id="outlined-basic"
              label="Equipment - comma separate"
              placeholder="barbell,yoga mat,medicine ball"
              required
              variant="outlined"
              style={{ width: "250px" }}
              value={equipment}
              onChange={handleEquipmentChange}
            />
          </div>
          <div class="workouttextbox">
            <TextField
              className="textbox"
              id="outlined-basic"
              label="Duration (in minutes)"
              placeholder="30"
              required
              variant="outlined"
              style={{ width: "250px" }}
              type="number"
              value={duration}
              onChange={handleDurationChange}
            />
          </div>
          <div class="workoutbuttongroup">
            <Button class="workoutbutton" onClick={handleSubmit}>
              Submit Workout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExercisePage;
