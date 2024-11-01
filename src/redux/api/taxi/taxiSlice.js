import { apiSlice } from "../apiSlice.js";

export const taxiApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		allTaxiData: builder.query({
			query: (filter) => ({
				url: `trip`,
				params: filter,
			}),
		}),
	}),
});

export const { useAllTaxiDataQuery } = taxiApiSlice;
