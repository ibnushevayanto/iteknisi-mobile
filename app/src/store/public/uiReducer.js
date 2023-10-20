import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    dataLogin: null,
  },
  reducers: {
    SET_DATA_LOGIN(state, {payload}) {
      state.dataLogin = payload;
    },
  },
});

export const {SET_DATA_LOGIN} = uiSlice.actions;

export const getDataLogin = state => state.ui.dataLogin;

export default uiSlice.reducer;
