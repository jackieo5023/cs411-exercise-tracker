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

import NutritionGraph from "./NutritionGraph";

//Stylesheet
import "../css/Nutrition.css";

function NutritionPage() {
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [ingr1, setIngr1] = useState("");
  const [ing2, setIngr2] = useState("");
  const [ing3, setIngr3] = useState("");
  const [ing4, setIngr4] = useState("");

  const handleChange = (event) => {
    setCalories(event.target.value);
  };

  return (
    <div class="grid-container-nu">
      <div class="A-nu">
        <div class="E-nu">
          <div class="I-nu">
            <Card className="recipecardnu">
              <CardContent className="recipecardcontentnu">
                <h4 className="recipecardtextnu">Salmon with Edamame</h4>
              </CardContent>
            </Card>
          </div>
          <div class="J-nu">
            <Card className="recipecardnu">
              <CardContent className="recipecardcontentnu">
                <h4 className="recipecardtextnu">Easy Chicken Tacos</h4>
              </CardContent>
            </Card>
          </div>
          <div class="K-nu">
            <Card className="recipecardnu">
              <CardContent className="recipecardcontentnu">
                <h4 className="recipecardtextnu">Garden Chicken Burger</h4>
              </CardContent>
            </Card>
          </div>
          <div class="L-nu">
            <Card className="recipecardnu">
              <CardContent className="recipecardcontentnu">
                <h4 className="recipecardtextnu">
                  Spinach and Mushroom Quiche
                </h4>
              </CardContent>
            </Card>
          </div>
        </div>
        <div class="F-nu">
          <div className="suggrecipetextpanelnu">
            <h4 className="suggrecipetextnu">Suggested Recipes</h4>
          </div>
          <div class="nutritiongraphpanel">
            <div className="nutritiongraph">
              <NutritionGraph></NutritionGraph>
            </div>
          </div>
        </div>
      </div>
      <div class="B-nu">
        <div class="nutritiontargetpanel">
          <Card className="nutritiontargetcard">
            <CardContent className="nutritiontargetcardcontent">
              <h4 className="nutritiontargetcardtext">Daily Target:</h4>
              <h1 className="nutritiontarget">1800 kcal</h1>
              <h4 className="nutritiontargetcardtext">Consumed</h4>
            </CardContent>
          </Card>
        </div>
        <div class="D-nu">
          <h4 className="suggrecipetextnu">Add a Meal</h4>
          <div class="recipetextbox">
            <form noValidate autoComplete="off">
              <TextField
                className="textbox"
                id="outlined-basic"
                label="Calories, if known (cals)"
                placeholder="800"
                required
                id="outlined-required"
                variant="outlined"
                style={{ width: "250px" }}
              />
            </form>
          </div>
          <div class="recipetextbox">
            <form noValidate autoComplete="off">
              <TextField
                className="textbox"
                id="outlined-basic"
                label="Protein, if known (grams)"
                placeholder="28"
                required
                id="outlined-required"
                variant="outlined"
                style={{ width: "250px" }}
              />
            </form>
          </div>
          <div class="recipedropdown">
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Main Ingredients (up to 4) *
              </InputLabel>
              <Select
                className="dropdownbox"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                required
                value={calories}
                onChange={handleChange}
                label="Main Ingredients (up to 4) *"
                style={{ width: "250px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Eggs</MenuItem>
                <MenuItem value={2}>Tuna</MenuItem>
                <MenuItem value={3}>Bread</MenuItem>
                <MenuItem value={4}>Chicken</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div class="recipedropdown">
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Main Ingredients (up to 4) *
              </InputLabel>
              <Select
                className="dropdownbox"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                required
                value={calories}
                onChange={handleChange}
                label="Main Ingredients (up to 4) *"
                style={{ width: "250px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Eggs</MenuItem>
                <MenuItem value={2}>Tuna</MenuItem>
                <MenuItem value={3}>Bread</MenuItem>
                <MenuItem value={4}>Chicken</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div class="recipedropdown">
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Main Ingredients (up to 4) *
              </InputLabel>
              <Select
                className="dropdownbox"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                required
                value={calories}
                onChange={handleChange}
                label="Main Ingredients (up to 4) *"
                style={{ width: "250px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Eggs</MenuItem>
                <MenuItem value={2}>Tuna</MenuItem>
                <MenuItem value={3}>Bread</MenuItem>
                <MenuItem value={4}>Chicken</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div class="recipedropdown">
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Main Ingredients (up to 4) *
              </InputLabel>
              <Select
                className="dropdownbox"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                required
                value={calories}
                onChange={handleChange}
                label="Main Ingredients (up to 4) *"
                style={{ width: "250px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Eggs</MenuItem>
                <MenuItem value={2}>Tuna</MenuItem>
                <MenuItem value={3}>Bread</MenuItem>
                <MenuItem value={4}>Chicken</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div class="recipebuttongroup">
            <Button class="recipebutton">Submit Meal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionPage;
