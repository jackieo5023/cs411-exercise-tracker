import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DashboardGraph from "./DashboardGraph";

//Stylesheet
import "../css/Dashboard.css";

function MainDashboard() {
  return (
    <div className="grid-container">
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
      <div className="F"></div>
      <div className="G"></div>
      <div className="H"></div>
      <div className="I"></div>
    </div>
  );
}

export default MainDashboard;
