import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice.js";
import taxiReducer from "./slice/taxiSlice.js";
import dataReducer from "./slice/dataSlice.js";
import mapSlice from "./slice/mapSlice.js";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		taxi: taxiReducer,
		data: dataReducer,
		map: mapSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			apiSlice.middleware
		),
});
