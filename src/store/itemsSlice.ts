import { createSlice } from "@reduxjs/toolkit";
import type { Item } from "../types";

const initialState: Item[] = [];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (_s, action: { payload: Item[] }) => action.payload,
    addItem: (s, action: { payload: string }) => {
      s.push({ id: Date.now(), title: action.payload.trim(), done: false });
    },
    removeItem: (s, action: { payload: number }) =>
      s.filter(it => it.id !== action.payload),
    toggleDone: (s, action: { payload: number }) => {
      const it = s.find(x => x.id === action.payload);
      if (it) it.done = !it.done;
    },
    editTitle: (s, action: { payload: { id: number; title: string } }) => {
      const it = s.find(x => x.id === action.payload.id);
      if (it) it.title = action.payload.title.trim();
    },
  },
});

export const { setItems, addItem, removeItem, toggleDone, editTitle } = itemsSlice.actions;
export default itemsSlice.reducer;
