import React, { useState } from "react";
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

import Question from "../components/Question";
import Category from '../components/Categories'
import * as actions from "../actions";

export default ()=>{

  const [addCategory,setAddCategory]=useState(false)
  const toggleAddCategory=()=>{
    setAddCategory(prev=>!prev)
  }
  
  return(
    <div style={{height:'100vh'}}> <FormControlLabel
    value={true}
    control={
      <Switch
        color="primary"
        checked={addCategory}
        onChange={toggleAddCategory}
      />
    }
    label={addCategory?'Switch to add Questions':'Switch to add Categories'}
  
  />{!addCategory?<Question></Question>:<Category></Category>}</div>
  )
}