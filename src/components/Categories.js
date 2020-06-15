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
  Chip,
} from "@material-ui/core";
import firebase from "../Firebase";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.svg";
import "../styles/App.css";
import Option from "./Option";
import * as actions from "../actions";
const Category = (props) => {
  const dispatch = useDispatch();
  // const classes = useStyles();
  const [name, setName] = React.useState("");
  const [heading, setHeading] = React.useState("");
  const [description, setDescription] = React.useState();
  
  const [locked, setLocked] = React.useState(false);
  const categories  = useSelector(state=>state.questions.categories.map(cat=>cat['name']))
  const handleDelete = (chipToDelete) => () => {
    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  }; 

  const toggleLocked = () => {
    setLocked((prev) => !prev);
  };
 

  const submitCategory = () => {
    dispatch(actions.addCategory({ name,heading,description,locked}));
    setName('')
    setHeading('')
    setDescription('') 
    setLocked(false)
  };
  const handleChange = (type, event) => {
    // console.log(value, option);
    switch (type) {
      case "name":
        setName(event.target.value);
        return;
      case "heading":
        setHeading(event.target.value);
        return;
      case "description":
        setDescription(event.target.value);
        return;
    //   case "options":
    //     console.log(value, options);
    //     options.push({ id: options.length + 1, statement: option, category });
    //     setOption("");
    //     setCategory("");
    //     return;
    //   case "image":
    //     setOption(event.target.files[0]);
    //     return;
      default:
        return;
    }
  };
 

  return (
    <div className="App">
      <List>
      <ListItem style={{ fontSize: 20, fontFamily: "Roboto" ,marginBottom:10}}>
              Add Category
            </ListItem>
        <ListItem>
          <TextField
            id="standard-multiline-flexible"
            label="Category statement here"
            multiline
            fullWidth={true}
            value={name}
            onChange={(event) => handleChange("name", event)}
            variant="outlined"
          />
        
        </ListItem>
        <ListItem>
          <TextField
            id="standard-multiline-flexible"
            label="Category statement here"
            multiline
            fullWidth={true}
            value={heading}
            onChange={(event) => handleChange("heading", event)}
            variant="outlined"
          />
        
        </ListItem>
        <ListItem>
          <TextField
            id="standard-multiline-flexible"
            label="Category statement here"
            multiline
            fullWidth={true}
            value={description}
            onChange={(event) => handleChange("description", event)}
            variant="outlined"
          />
        
        </ListItem>
       

     
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
          

          {
            <Button
              variant="contained"
              color="primary"
              disabled={!locked}
              onClick={() => submitCategory()}
            >
              Submit Category
            </Button>
          }
        </ListItem>
      </List>
      <div>
          {categories.map(data=><li key={data.id}>
            <Chip
            //   icon={icon}
              label={data.name}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            //   className={classes.chip}
            />
            </li>)}
          </div>
    </div>
  );
};

export default Category;
