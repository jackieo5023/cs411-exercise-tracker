import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  InputAdornment,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import SettingsIcon from "@material-ui/icons/Settings";

//Stylesheet
import "../css/Profile.css";

import { updatePerson, getPerson, getCompletedWorkouts } from "../utils/api";

function UserProfile({ location, userId }) {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    gender: "FEMALE",
    age: 0,
    weight: 0,
    height: 0,
  });
  const [workouts, setWorkouts] = useState([]);
  const [editingProfile, setEditingProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(
    location.state ? location.state.isEditing : false
  );

  useEffect(() => {
    async function fetchData() {
      const response = await getPerson({ id: userId });
      if (response.status === 200) {
        setProfile(response.person);
        setEditingProfile(response.person);
      }

      const workoutsResponse = await getCompletedWorkouts({ id: userId });
      if (workoutsResponse.status === 200) {
        setWorkouts(workoutsResponse.workouts);
      }
    }
    fetchData();
  }, [userId]);

  const handleEdit = useCallback(async () => {
    if (isEditing) {
      // TODO: if error set error message
      await updatePerson({ ...editingProfile, id: userId });
      setProfile(editingProfile);
      setIsEditing(false);
    } else {
      setEditingProfile(profile);
      setIsEditing(true);
    }
  }, [editingProfile, isEditing, profile, userId]);

  const handleCancel = useCallback(() => {
    setEditingProfile(profile);
    setIsEditing(false);
  }, [profile]);

  return (
    <div className="grid-container-profile">
      <div className="A">
        <div className="row">
          <TextField
            id="standard-basic"
            disabled={!isEditing}
            value={editingProfile.firstName}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            id="standard-basic"
            disabled={!isEditing}
            value={editingProfile.lastName}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, lastName: e.target.value })
            }
          />
        </div>
        <div className="row">
          <Input
            className="age"
            id="standard-adornment-weight"
            type="number"
            disabled={!isEditing}
            value={editingProfile.age}
            endAdornment={
              <InputAdornment position="end">years old</InputAdornment>
            }
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                age: e.target.value,
              })
            }
          />
        </div>
        <div className="row">
          <TextField
            className="gender"
            id="standard-adornment-weight"
            select
            disabled={!isEditing}
            value={editingProfile.gender}
            endAdornment={
              <InputAdornment position="end">years old</InputAdornment>
            }
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                gender: e.target.value,
              })
            }
          >
            <MenuItem key="male" value="MALE">
              Male
            </MenuItem>
            <MenuItem key="female" value="FEMALE">
              Female
            </MenuItem>
            <MenuItem key="other" value="OTHER">
              Other
            </MenuItem>
          </TextField>
        </div>
        <div className="row">
          <Input
            className="weight"
            id="standard-adornment-weight"
            type="number"
            disabled={!isEditing}
            value={editingProfile.weight}
            endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                weight: e.target.value,
              })
            }
          />
          <Input
            className="height"
            id="standard-adornment-weight"
            type="number"
            disabled={!isEditing}
            value={editingProfile.height}
            endAdornment={
              <InputAdornment position="end">inches</InputAdornment>
            }
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                height: e.target.value,
              })
            }
          />
        </div>
        <div className="row">
          <List>
            Past Workouts
            {workouts.map((workout) => {
              return (
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={workout.type}
                    secondary={
                      <>
                        {workout.METs}
                        {workout.equipment.length === 0
                          ? ""
                          : `, ${workout.equipment.join(", ")}`}
                      </>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
      <div className="B">
        <div>
          <Button
            color={isEditing ? "primary" : "default"}
            onClick={handleEdit}
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
          {isEditing && (
            <Button
              color="secondary"
              onClick={handleCancel}
              startIcon={<ClearIcon />}
            >
              Cancel
            </Button>
          )}
        </div>
        <div>
          <Link className="link" to="/settings">
            <Button startIcon={<SettingsIcon />}>Settings</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
