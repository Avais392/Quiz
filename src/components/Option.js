import React from "react";
import { TextField } from "@material-ui/core";
import logo from "../assets/logo.svg";
import "../styles/App.css";

const Option = (props) => {
  // const classes = useStyles();
  const [value, setValue] = React.useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="App">
      <TextField
        id="standard-multiline-flexible"
        label="Option statement here"
        multiline
        fullWidth={true}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
    </div>
  );
};

export default Option;
