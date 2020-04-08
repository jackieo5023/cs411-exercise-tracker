import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  LineSeries,
  SplineSeries,
  Legend,
  Title,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";

//When migrating to external data sources, use this line:
// import { weight as data } from "../../../demo-data/data-vizualization";
//To add a legend, add <Legend /> after the graph/chart but before title

function ExerciseGraph() {
  const data = [
    {
      year: "5/1",
      ch: 250,
    },
    {
      year: "5/2",
      ch: 75,
    },
    {
      year: "5/3",
      ch: 180,
    },
    {
      year: "5/4",
      ch: 375,
    },
    {
      year: "5/5",
      ch: 420,
    },
    {
      year: "5/6",
      ch: 500,
    },
    {
      year: "5/7",
      ch: 230,
    },
  ];

  const [height, setHeight] = useState(300);

  return (
    <Paper>
      <Chart data={data} height={height}>
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          name="Calories Burned Per Day"
          valueField="ch"
          argumentField="year"
          color="#B97EA1"
        />
        <Title text="Calories Burned Per Day" />
      </Chart>
    </Paper>
  );
}

export default ExerciseGraph;
