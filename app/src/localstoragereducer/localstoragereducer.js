import { createAction, createReducer } from "@reduxjs/toolkit";

const localstoragetrue = createAction("local/ltrue");
const localstoragefalse = createAction("local/lfalse");

const initialState = {
  value: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(localstoragetrue, (state, action) => {
    state.value = true;
  });
  builder.addCase(localstoragefalse, (state, action) => {
    state.value = false;
  });
});

export { localstoragetrue, localstoragefalse };

export default reducer;
