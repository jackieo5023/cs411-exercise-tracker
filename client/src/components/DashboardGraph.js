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
} from "@devexpress/dx-react-chart-material-ui";

//When migrating to external data sources, use this line:
// import { weight as data } from "../../../demo-data/data-vizualization";
//To add a legend, add <Legend /> after the graph/chart but before title

function DashboardGraph() {
  const data = [
    {
      year: "5/1",
      ch: 130,
    },
    {
      year: "5/2",
      ch: 131,
    },
    {
      year: "5/3",
      ch: 120,
    },
    {
      year: "5/4",
      ch: 125,
    },
    {
      year: "5/5",
      ch: 120,
    },
    {
      year: "5/6",
      ch: 140,
    },
    {
      year: "5/7",
      ch: 130,
    },
  ];

  const [height, setHeight] = useState(300);

  return (
    <Paper>
      <Chart data={data} height={height}>
        <ArgumentAxis />
        <ValueAxis />
        <SplineSeries
          name="Weight Change Throughout the Week"
          valueField="ch"
          argumentField="year"
          color="#F95F62"
        />
        <Title text="Weight Change Throughout the Week" />
      </Chart>
    </Paper>
  );
}

export default DashboardGraph;
