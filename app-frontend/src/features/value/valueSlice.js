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
    addValue:{
      reducer(state, action) {
        state.loading = true;
        state.value = action.payload;
      }    
    },
    addValueFailure: {
      reducer(state, action) { 
        state.hasErrors = true;
        state.errorMessage = action.payload;
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
export const { addValue, addValueFailure, showErr } = valueSlice.actions;


//selectors
export const valueSelector = (state) => state.value;
export const errorMessageSelector = (state) => state.errorMessage;

export default valueSlice.reducer;

//Send new value to server 
export function newValue(val) {
  return async dispatch => {
    try {
      const request = await axios.post('http://localhost:3001/', {value: val});
      dispatch(addValue(request.data));
      
      //hide error message if request is successful
      document.getElementById("error-msg").innerHTML = "";
      document.getElementById("error-msg").style.display = "none";
      return request;
    } catch (error) {
        dispatch(addValueFailure(error.response.data.errors[0].msg));
        dispatch(showErr(error.response.data.value));
        //Show error message
        document.getElementById("error-msg").style.display = "inline";
        document.getElementById("error-msg").innerHTML = error.response.data.errors[0].msg;
    } 
  }
}
