import { FaFilter } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { allTaxiSelector, setFilter } from "../../redux/slice/taxiSlice";

const Filter = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [trip, setTrip] = useState("");
	const [amount, setAmount] = useState("");
	const [openFilter, setOpenFilter] = useState(false);
	const taxiQuery = useSelector(allTaxiSelector);

	const dispatch = useDispatch();

	const isWithin2014 = (date) => date.getFullYear() === 2014;

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const openAllFilter = () => {
		setOpenFilter(!openFilter);
	};

	const handleSave = () => {
		dispatch(setFilter(filterData));
		openAllFilter();
	};

	const filterData = {
		time: selectedDate ? formatDate(new Date(selectedDate)) : "",
		trip,
		amount,
	};

	useEffect(() => {
		if (openFilter) {
			setTrip(taxiQuery.trip);
			setAmount(taxiQuery.amount);
			taxiQuery.time != "" && setSelectedDate(new Date(taxiQuery.time));
		}
	}, [taxiQuery, openFilter]);

	return (
		<div className="relative px-4 mb-2">
			<button
				className="flex items-center gap-1 px-2 py-1 text-white bg-yellow-400 border-2 border-white"
				onClick={openAllFilter}
			>
				<FaFilter />
				filter
			</button>

			<div
				className={`absolute ${
					openFilter ? "" : "hidden"
				} top-0 shadow-md z-20 p-4 bg-white left-4`}
			>
				<ImCross
					onClick={openAllFilter}
					className="absolute p-2 text-white bg-yellow-400 border-2 border-white rounded-full shadow-md cursor-pointer -top-4 -right-4"
					size={32}
				/>
				<div className="flex items-center justify-between gap-1 mb-2">
					<label className="font-medium text-yellow-400">Date:</label>
					<DatePicker
						selected={selectedDate}
						onChange={(date) => setSelectedDate(date)}
						filterDate={isWithin2014}
						dateFormat="yyyy-MM-dd"
						openToDate={new Date(2014, 0, 1)}
						isClearable
						placeholderText="Select a date"
						className="w-32 p-1 text-yellow-400 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
					/>
				</div>

				<div className="flex items-center justify-between gap-1 mb-2">
					<label className="font-medium text-yellow-400">Trip:</label>
					<input
						type="number"
						placeholder="Start from 1"
						value={trip}
						onChange={(e) => setTrip(e.target.value)}
						className="w-32 p-1 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
					/>
				</div>

				<div className="flex items-center justify-between gap-1 mb-2">
					<label className="font-medium text-yellow-400">Amount:</label>
					<input
						type="number"
						placeholder="Start from 1"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className="w-32 p-1 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
					/>
				</div>

				<div className="flex justify-end">
					<button
						className="px-2 py-1 text-sm font-semibold text-white transition duration-200 bg-yellow-400 hover:bg-yellow-600 hover:text-gray-100"
						onClick={handleSave}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default Filter;
