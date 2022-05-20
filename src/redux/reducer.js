import { createSlice } from "@reduxjs/toolkit";

const initialValue = [];

export const todoReducer = createSlice({
  name: "todo",
  initialState: { value: initialValue },
  reducers: {
    setTodo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTodo } = todoReducer.actions;

export default todoReducer.reducer;
