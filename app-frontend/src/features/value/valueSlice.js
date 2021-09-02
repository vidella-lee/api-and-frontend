import { createSlice } from '@reduxjs/toolkit';

const axios = require('axios');

export const initialState = {
  loading: false,
  hasErrors: false,
  value: "0",
  errorMessage: "",
};

const valueSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    getValue: state => {
      state.loading = true;
    },
    addValue:{
      reducer(state, action) {
        state.loading = true;
        state.value = action.payload;
      }    
    },
    getValueSuccess: (state, { payload }) => {
      state.value = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getValueFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    addValueFailure: {
      reducer(state, action) { 
        state.hasErrors = true;
        state.errorMessage = action.payload;
        console.log(action.payload);
      }
    },
    showErr: {
      reducer(state, action){
        state.value = action.payload;
      }
    }
  },
});

//actions
export const { getValue, addValue, getValueSuccess, getValueFailure, addValueFailure, showErr } = valueSlice.actions;


//selectors
export const valueSelector = (state) => state.value;
export const errorMessageSelector = (state) => state.errorMessage;
export const hasErrorsSelector = (state) => state.hasErrors;

export default valueSlice.reducer;

//Fetch data
export function fetchValue() {
  return async dispatch => {
    dispatch(getValue());
  
    try {
      const response = await fetch('http://localhost:3001/');
      const data = await response.text();
  
      dispatch(getValueSuccess(data));
    } catch (error) {
        dispatch(getValueFailure());
    }
    }
  }

//Send new value to server 
export function newValue(val) {
  return async dispatch => {
    try {
      const response = await axios.post('http://localhost:3001/', {value: val, });
      dispatch(addValue(response.data));
      dispatch(getValueSuccess(response.data));
      
      //hide error message if request is successful
      document.getElementById("error-msg").innerHTML = "";
      document.getElementById("error-msg").style.display = "none";
      return response;
    } catch (error) {
        dispatch(addValueFailure(error.response.data.errors[0].msg));
        dispatch(showErr(error.response.data.value));
        //Show error message
        document.getElementById("error-msg").style.display = "inline";
        document.getElementById("error-msg").innerHTML = error.response.data.errors[0].msg;
    } 
  }
}
