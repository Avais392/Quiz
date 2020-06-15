import React from "react";
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
} from "@material-ui/core";
import firebase from "../Firebase";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.svg";
import "../styles/App.css";
import Option from "./Option";
import * as actions from "../actions";
import { useEffect } from "react";
const Question = (props) => {
  const dispatch = useDispatch();
  // const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const categories  = useSelector(state=>state.questions.categories?.map(cat=>cat['name']))
  const [option, setOption] = React.useState("");
  const [locked, setLocked] = React.useState(false);
  const [imageOptions, setImageOptions] = React.useState(false);

  const toggleLocked = () => {
    setLocked((prev) => !prev);
  };
  const toggleImageOptions = () => {
    {
      !options.length && setImageOptions((prev) => !prev);
    }
  };

  const submitQuestion = () => {
    dispatch(actions.addQuestion({ value, options, locked ,imageOptions}));
    setValue("");
    setOptions([]);
    setLocked(false);
    setCategory("");
    setOption("");
    setLocked(false);
    setImageOptions(false);
  };
  const handleChange = (type, event) => {
    
    switch (type) {
      case "question":
        setValue(event.target.value);
        return;
      case "option":
        setOption(event.target.value);
        return;
      case "category":
        setCategory(event.target.value);
        return;
      case "options":
        console.log(value, options);
        options.push({ id: options.length + 1, statement: option, category });
        setOption("");
        setCategory("");
        return;
      case "image":
        setOption(event.target.files[0]);
        return;
      default:
        return;
    }
  };
  const deleteOption = (id) => {
    setOptions(options.filter((opt) => opt.id !== id));
  };
  const addOption = () => {
    return <Option></Option>;
  };

  useEffect(() => {
    dispatch(actions.fetchCategories());
  }, [dispatch]);

  return (
    <div className="App">
      <List>
      <ListItem style={{ fontSize: 20, fontFamily: "Roboto" ,marginBottom:10}}>
              Add Question
            </ListItem>
        <ListItem>
          <TextField
            id="standard-multiline-flexible"
            label="Question statement here"
            multiline
            fullWidth={true}
            value={value}
            onChange={(event) => handleChange("question", event)}
            variant="outlined"
          />
        </ListItem>
        {options.map((item) => (
          <ListItem key={item.id}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12} md={9}>
                
                  <TextField
                    id="standard-multiline-flexible"
                    label="Option statement here"
                    disabled
                    multiline
                    fullWidth={true}
                    value={item.statement}
                    //   onChange={(text) => handleChange("option", text)}
                    variant="outlined"
                  />
                
              </Grid>
              <Grid item xs={10} md={2}>
                <FormControl disabled variant="outlined" fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={item.category}
                    onChange={(event) => handleChange("category", event)}
                    label="Category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {categories.map((category) => (
                      <MenuItem value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={1} xs={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteOption(item.id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}

        {value && (
          <ListItem style={{ justifyContent: "space-between" }}>
            <Grid
              container
              direction="row"
              // justify="flex-end"
              alignItems="center"
              spacing={3}
            >
              <Grid item md={8} xs={12}>
              {!imageOptions ? ( <TextField
                  id="standard-multiline-flexible"
                  label="Option statement here"
                  multiline
                  fullWidth
                  value={option}
                  onChange={(text) => handleChange("option", text)}
                  variant="outlined"
                />) : (
                  <input
                    type="file"
                    accept="image/*"
                    capture="camera"
                    id="cameraInput"
                    onChange={(event) => handleChange("image", event)}
                  ></input>
                )}
              </Grid>
              <Grid item md={2} xs={8}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category
                  </InputLabel>
                  <Select
                    value={category}
                    onChange={(event) => handleChange("category", event)}
                    label="Category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {categories.map((category) => (
                      <MenuItem value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2} xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!option && !category && true}
                  onClick={(event) => handleChange("options", event)}
                >
                  Add Option
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        )}
        <ListItem style={{ justifyContent: "space-between" }}>
          <FormControlLabel
            value={true}
            control={
              <Switch
                color="primary"
                checked={locked}
                onChange={toggleLocked}
              />
            }
            label="Locked"
            labelPlacement="Locked"
          />
          <FormControlLabel
            value={true}
            control={
              <Switch
                color="primary"
                checked={imageOptions}
                onChange={toggleImageOptions}
              />
            }
            label="Image Options"
            labelPlacement="Image Options"
          />

          {
            <Button
              variant="contained"
              color="primary"
              disabled={!locked}
              onClick={() => submitQuestion()}
            >
              Submit Question
            </Button>
          }
        </ListItem>
      </List>
    </div>
  );
};

export default Question;
