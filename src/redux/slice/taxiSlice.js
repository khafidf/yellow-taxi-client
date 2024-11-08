import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	limit: 10,
	page: 1,
	time: "",
	trip: "",
	amount: "",
};

const taxiSlice = createSlice({
	name: "taxi",
	initialState,
	reducers: {
		setLimitPagination(state, action) {
			const { limit } = action.payload;
			state.limit = limit;
		},
		setPagePagination(state, action) {
			const { page } = action.payload;
			state.page = page;
		},
		setFilter(state, action) {
			const { time, trip, amount } = action.payload;
			state.time = time;
			state.trip = trip;
			state.amount = amount;
			state.page = 1;
		},
	},
});

export const { setLimitPagination, setPagePagination, setFilter } =
	taxiSlice.actions;

export const allTaxiSelector = (state) => state.taxi;
export const limitTaxiSelector = (state) => state.taxi.limit;
export const pageTaxiSelector = (state) => state.taxi.page;
export const timeTaxiSelector = (state) => state.taxi.time;
export const tripTaxiSelector = (state) => state.taxi.trip;
export const amountTaxiSelector = (state) => state.taxi.amount;

export default taxiSlice.reducer;
