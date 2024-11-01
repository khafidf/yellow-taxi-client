import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pagination: {},
	response: [],
	status: null,
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setData(state, action) {
			const { pagination, response, status } = action.payload;
			state.pagination = pagination;
			state.response = response;
			state.status = status;
		},
	},
});

export const { setData } = dataSlice.actions;

export const paginationDataSelector = (state) => state.data.pagination;
export const responseDataSelector = (state) => state.data.response;
export const statusDataSelector = (state) => state.data.status;

export default dataSlice.reducer;
