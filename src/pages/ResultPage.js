import React, { useEffect, useState } from "react";
import firebase from "../Firebase";
// import '@culturehq/charts/dist/style.css'
// import {PieChart} from '@culturehq/chart'
import {
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  FormLabel,
  RadioGroup,
  Radio,
  rgbToHex,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import "../styles/App.css";
import { Doughnut, Bar, Pie } from "react-chartjs-2";

import * as actions from "../actions";
const logo = require("../assets/logo.png");
const ResultPage = (props) => {
  const percentiles = useSelector((state) => state.questions.percentiles);
  const category = useSelector((state) => state.questions.category);
  let data = {
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Red", "Yellow", "Blue"],
  };
  const resultData = useSelector((state) => {
    const d = state.questions.percentiles.map((obj) => obj.value);
    const l = state.questions.percentiles.map((obj) => obj.key);

    return {
      datasets: [
        {
          data: d,
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: l,
    };
  });
  const [submitable, setSubmitable] = useState(false);
  const [results, setResults] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('injj')
    data.datasets.data = [];
    // let perc=[{key:'abs',value:4},{key:'aooo',value:3}]
    for (let key in percentiles) {
      data.datasets.data = percentiles[key];
      data.labels = key;
    }
    // dispatch(actions.fetchQuestions());
  }, [dispatch]);
  const fetchRes = () => {
    console.log("in", percentiles);
    data.datasets.data = [];
    for (let key in percentiles) {
      data.datasets.data = percentiles[key];
      data.labels = key;
      console.log(key);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${require("../assets/background.png")})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        color: "white",
        backgroundSize: "cover",
      }}
    >
      {" "}
      
      <Grid
        container
        direction="row"
        justify="space-between"
        style={{ padding: 80 }}
         alignItems="center"
        spacing={3}
      >
        <Grid item xs={5} className={"bg-box"} style={{padding:30}}>
         
          <List
            style={{
              fontFamily: "Roboto",
              fontSize: 20,
              color: "rgb(86,84,84)",
            }}
          >
            <div className={"App"}>
              <ListItem
                justify={"center"}
                style={{
                  fontSize: 40,
                  fontFamily: "Droid Sans",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                Din Stultype er
              </ListItem>
            </div>
          </List>

          <Pie
            data={resultData}
            style={{ margin: 50 }}
            options={{ maintainAspectRatio: false }}
          />
        </Grid>{" "}
        <Grid item xs={6} className={"bg-box"} style={{padding:30}}>
          <List
            style={{
              fontFamily: "Roboto",
              fontSize: 20,
              color: "rgb(86,84,84)",
            }}
          >
            <ListItem
              style={{
                fontSize: 40,
                fontFamily: "Droid Sans",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              {category?.name}
            </ListItem>
            <ListItem
              style={{ marginTop: 20, marginBottom: 20, color: "gray" }}
            >
              {category?.description}
            </ListItem>
          </List>
        </Grid>{" "}
      </Grid>
      <img
        style={{
          height: 100,
        }}
        src={require("../assets/logo.png")}
      />
    </div>
  );
};

export default ResultPage;
