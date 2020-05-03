import React, { useCallback, useEffect, useState } from "react";
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
import { addRecipe, getSuggestedRecipes } from "../utils/api";

function NutritionPage({ userId }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);

  const handleSubmit = async () => {
    await addRecipe({
      recipeName: name,
      calories,
      protein,
      id: userId,
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCaloriesChange = (event) => {
    setCalories(event.target.value);
  };
  const handleProteinChange = (e) => {
    setProtein(e.target.value);
  };

  const handleAddSuggestedRecipe = useCallback(
    async (i) => {
      await addRecipe({ id: userId, ...suggestedRecipes[i] });
    },
    [suggestedRecipes, userId]
  );

  useEffect(() => {
    async function fetchData() {
      const recipeResponse = await getSuggestedRecipes({ id: userId });
      if (recipeResponse.status === 200) {
        setSuggestedRecipes(recipeResponse.food);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <div class="grid-container-nu">
      <div class="A-nu">
        <div class="E-nu">
          {suggestedRecipes[0] && (
            <div class="I-nu">
              <Card className="recipecardnu">
                <CardContent className="recipecardcontentnu">
                  <div className="recipecardtextnu">
                    <h4>Name: {suggestedRecipes[0].recipeName}</h4>
                    <h4>Protein: {suggestedRecipes[0].protein}g</h4>
                    <h4>Calories: {suggestedRecipes[0].calories}</h4>
                    <h4>Made By: {suggestedRecipes[0].firstName}</h4>
                    <Button onClick={() => handleAddSuggestedRecipe(0)}>
                      Add to Meals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {suggestedRecipes[1] && (
            <div class="J-nu">
              <Card className="recipecardnu">
                <CardContent className="recipecardcontentnu">
                  <div className="recipecardtextnu">
                    <h4>Name: {suggestedRecipes[1].recipeName}</h4>
                    <h4>Protein: {suggestedRecipes[1].protein}g</h4>
                    <h4>Calories: {suggestedRecipes[1].calories}</h4>
                    <h4>Made By: {suggestedRecipes[1].firstName}</h4>
                    <Button onClick={() => handleAddSuggestedRecipe(1)}>
                      Add to Meals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {suggestedRecipes[2] && (
            <div class="K-nu">
              <Card className="recipecardnu">
                <CardContent className="recipecardcontentnu">
                  <div className="recipecardtextnu">
                    <h4>Name: {suggestedRecipes[2].recipeName}</h4>
                    <h4>Protein: {suggestedRecipes[2].protein}g</h4>
                    <h4>Calories: {suggestedRecipes[2].calories}</h4>
                    <h4>Made By: {suggestedRecipes[2].firstName}</h4>
                    <Button onClick={() => handleAddSuggestedRecipe(2)}>
                      Add to Meals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {suggestedRecipes[3] && (
            <div class="L-nu">
              <Card className="recipecardnu">
                <CardContent className="recipecardcontentnu">
                  <div className="recipecardtextnu">
                    <h4>Name: {suggestedRecipes[3].recipeName}</h4>
                    <h4>Protein: {suggestedRecipes[3].protein}g</h4>
                    <h4>Calories: {suggestedRecipes[3].calories}</h4>
                    <h4>Made By: {suggestedRecipes[3].firstName}</h4>
                    <Button onClick={() => handleAddSuggestedRecipe(3)}>
                      Add to Meals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
                label="Recipe Name"
                placeholder="Burger"
                required
                id="outlined-required"
                variant="outlined"
                style={{ width: "250px" }}
                value={name}
                onChange={handleNameChange}
              />
            </form>
          </div>
          <div class="recipetextbox">
            <form noValidate autoComplete="off">
              <TextField
                className="textbox"
                id="outlined-basic"
                label="Calories (cals)"
                placeholder="800"
                required
                id="outlined-required"
                variant="outlined"
                style={{ width: "250px" }}
                value={calories}
                onChange={handleCaloriesChange}
                type="number"
              />
            </form>
          </div>
          <div class="recipetextbox">
            <form noValidate autoComplete="off">
              <TextField
                className="textbox"
                id="outlined-basic"
                label="Protein (grams)"
                placeholder="28"
                required
                id="outlined-required"
                variant="outlined"
                style={{ width: "250px" }}
                value={protein}
                onChange={handleProteinChange}
                type="number"
              />
            </form>
          </div>
          <div class="recipebuttongroup">
            <Button class="recipebutton" onClick={handleSubmit}>
              Submit Meal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionPage;
