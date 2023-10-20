import {configureStore} from '@reduxjs/toolkit';
import uiReducer from './public/uiReducer';

export default configureStore({
  reducer: {
    ui: uiReducer,
  },
});
