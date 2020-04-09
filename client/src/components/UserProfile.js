import React, { useCallback, useState } from "react";
import {
  Button,
  Input,
  InputAdornment,
  MenuItem,
  TextField,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import SettingsIcon from "@material-ui/icons/Settings";

//Stylesheet
import "../css/Profile.css";
import { Link } from "react-router-dom";

function UserProfile() {
  // TODO: populate data from profile api call
  const [profile, setProfile] = useState({
    firstName: "Jackie",
    lastName: "Osborn",
    gender: "Female",
    age: 20,
    weight: 130,
    height: 70,
  });
  const [editingProfile, setEditingProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => {
    if (isEditing) {
      // TODO: call api to save profile, if error set error message
      setProfile(editingProfile);
      setIsEditing(false);
    } else {
      setEditingProfile(profile);
      setIsEditing(true);
    }
  }, [editingProfile, isEditing, profile]);

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
            <MenuItem key="male" value="Male">
              Male
            </MenuItem>
            <MenuItem key="female" value="Female">
              Female
            </MenuItem>
            <MenuItem key="other" value="Other">
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
      </div>
      <div className="B">
        <div>
          <Button
            color="primary"
            onClick={handleEdit}
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
          {isEditing && (
            <Button
              color="primary"
              onClick={handleCancel}
              startIcon={<ClearIcon />}
            >
              Cancel
            </Button>
          )}
        </div>
        <div>
          <Link className="link" to="/settings">
            <Button color="primary" startIcon={<SettingsIcon />}>
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
