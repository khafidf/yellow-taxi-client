import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	open: false,
	pickup: {
		longitude: "",
		latitude: "",
	},
	dropoff: {
		longitude: "",
		latitude: "",
	},
	vendor: "",
	distance: "",
	fareAmount: "",
	pickupDate: "",
	dropoffDate: "",
};

const mapSlice = createSlice({
	name: "map",
	initialState,
	reducers: {
		setModalData(state, action) {
			const { data, open } = action.payload;
			const convertTime = (time) => {
				const convert = new Date(time);

				return convert.toLocaleDateString("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				});
			};
			state.open = open;
			state.pickup.longitude = data.pickup_longitude;
			state.pickup.latitude = data.pickup_latitude;
			state.dropoff.longitude = data.dropoff_longitude;
			state.dropoff.latitude = data.dropoff_latitude;
			state.vendor = data.vendor_id;
			state.distance = `${Math.round(data.trip_distance * 10) / 10} km`;
			state.fareAmount = `${data.fare_amount}$`;
			state.pickupDate = convertTime(data.pickup_datetime);
			state.dropoffDate = convertTime(data.dropoff_datetime);
		},
		setClose(state, action) {
			const { open } = action.payload;
			state.open = open;
		},
	},
});

export const { setModalData, setClose } = mapSlice.actions;

export const allModalDataSelector = (state) => state.map;

export default mapSlice.reducer;
