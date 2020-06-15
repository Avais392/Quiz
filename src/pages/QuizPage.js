import React, { useEffect, useState } from "react";
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
  Paper,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/App.css";

import * as actions from "../actions";
const logo = require("../assets/logo.png");
const QuizPage = (props) => {
  const questions = useSelector((state) =>
    state.questions.questions.filter((q) => q.locked)
  );

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState([]); //answers
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitable, setSubmitable] = useState(false);
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  const startQuiz = () => {
    setUser(email);
    //  history.push('/result')
  };
  const submitQuiz = () => {
    dispatch(actions.setResults(user, results));
    //  history.push('/result')
  };

  const handleChange = (qId, event, category) => {
    setAnswers([...answers, { [qId]: event.target.value }]);
    setResults([...results, { [qId]: category[0].category }]);

    if (currentIndex < questions.length + 1) setCurrentIndex(currentIndex + 1);
    else setSubmitable(true);
  };
  const handleImageSelect = (qId, option) => {
    console.log(qId, option);
    setAnswers([...answers, { [qId]: option.statement }]);
    setResults([...results, { [qId]: option.category }]);

    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else setSubmitable(true);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  useEffect(() => {
    dispatch(actions.fetchQuestions());
  }, [dispatch]);

  return (
    <div style={{ height: "70vh" }}>
      <img
        style={{
          height: 40,
          position: "absolute",
          top: 0,
          left: 0,
          margin: "5%",
        }}
        src={logo}
      />
      {
        user
         ? (
          <div
            style={{
              flex: 1,
              flexDirection: "row",

              margin: 10,
              marginTop: 50,
            }}
          >
            <List style={{ fontFamily: "Roboto", fontSize: 20 }}>
              <ListItem style={{ fontSize: 40, fontFamily: "Droid Sans" }}>
                Spørgsmål / Beskrivelse
              </ListItem>

              {questions.map(
                (item, index) =>
                  index === currentIndex && (
                    <div>
                      <ListItem
                        style={{
                          marginTop: 20,
                          marginBottom: 20,
                          color: "gray",
                        }}
                      >
                        {item.value}
                      </ListItem>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        // alignItems="center"
                        spacing={3}
                      >
                        <Grid item xs={6} style={{ textAlign: "left" }}>
                          {!item.imageOptions && (
                            <FormControl component="fieldset">
                              <RadioGroup
                                value={answers[item.id]}
                                onChange={(event) => {
                                  var ans = item.options.filter(
                                    (opt) =>
                                      opt.statement === event.target.value
                                  );
                                  console.log(ans);
                                  handleChange(item.id, event, ans);
                                }}
                              >
                                {item.options?.map((option) => (
                                  <FormControlLabel
                                    value={option.statement}
                                    control={<Radio />}
                                    label={option.statement}
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          )}
                        </Grid>{" "}
                        <Grid item xs={6}>
                          {item.imageOptions && (
                            <div
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "flex-end",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  height: 300,
                                  width: 500,
                                  backgroundColor: "rgb(238,186,190)",
                                }}
                              >
                                
                                 
                                
                                  <List
                                   style={{
                                    position: "absolute",
                                    top: -40,
                                    left: -40,
                                    height: 300,
                                    width: 500,
                                   
                                  }}>
                                    <Grid
                                      container
                                      direction="row"
                                      justify="space-between"
                                      alignItems="flex-start"
                                      spacing={3}
                                    >
                                      {item.options?.map((option) => (
                                        <Grid
                                          item
                                          xs={4}
                                          style={{ textAlign: "left" }}
                                        >
                                          <ListItem
                                            button
                                            onClick={() =>
                                              handleImageSelect(item.id, option)
                                            }
                                          >
                                            <img
                                              style={{ height: 120, width: 100 }}
                                              src={option.statement}
                                            ></img>
                                          </ListItem>
                                        </Grid>
                                      ))}
                                      {item.options?.map((option) => (
                                        <Grid
                                          item
                                          xs={4}
                                          style={{ textAlign: "left" }}
                                        >
                                          <ListItem
                                            button
                                            obutton
                                            key={option.statement}
                                            onClick={() =>
                                              handleImageSelect(item.id, option)
                                            }
                                          >
                                            <img
                                              style={{ height: 120, width: 100 }}
                                              src={option.statement}
                                            ></img>
                                          </ListItem>
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </List>
                                
                              </div>

                              {/* <div
                                style={{
                                  // height: 100,
                                  // marginTop: 50,
                                  // marginLeft: -5,
                                  // marginRight: 5,
                                  // marginBottom:-10,
                                  backgroundColor: "rgb(238,186,190)",
                                }}
                              >
                         </div> */}
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  )
              )}
            </List>
            <Link to="/result" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: 20 }}
                disabled={!submitable}
                onClick={() => submitQuiz()}
              >
                indsend quiz
              </Button>
            </Link>
          </div>
        ) : (
          <Paper
            elevation={3}
            style={{
              margin: 200,
              marginTop: 50,
              marginBottom: 50,
              padding: 50,
            }}
          >
            <div style={{ flexDirection: "column", flex: 1, marginBottom: 50 }}>
              <TextField
                label="Email"
                value={email}
                id="outlined-margin-dense"
                margin="dense"
                variant="outlined"
                onChange={(event) => onEmailChange(event)}
                style={{}}
              />
            </div>{" "}
            <Button
              variant="contained"
              color="primary"
              disabled={!email}
              onClick={startQuiz}
            >
              Start Quiz
            </Button>
          </Paper>
        )
      }
    </div>
  );
};

export default QuizPage;
