// import { useDispatch, useSelector } from "react-redux";
// import { useAllTaxiDataQuery } from "./redux/api/taxi/taxiSlice";
import // allTaxiSelector,
// setAmountFilter,
// setLimitPagination,
// setPagePagination,
// setTimeFilter,
// setTripFilter,
"./redux/slice/taxiSlice";

import { Nav, About, Table } from "./components";
import // paginationDataSelector,
// responseDataSelector,
// setData,
// statusDataSelector,
"./redux/slice/dataSlice";

function App() {
	return (
		<div>
			<Nav />
			<About />
			<Table />
			{/* <h1>Tes</h1>
			<button className="p-2 bg-red-200" onClick={() => console.log(taxiQuery)}>
				halo
			</button>
			<button
				className="p-2 bg-blue-200"
				onClick={() => dispatch(setLimitPagination({ limit: 25 }))}
			>
				limit
			</button>
			<button
				className="p-2 bg-yellow-200"
				onClick={() => dispatch(setPagePagination({ page: 2 }))}
			>
				page
			</button>
			<button
				className="p-2 bg-violet-200"
				onClick={() => dispatch(setTimeFilter({ time: "2014-02-12" }))}
			>
				time
			</button>
			<button
				className="p-2 bg-lime-200"
				onClick={() => dispatch(setTripFilter({ trip: 10 }))}
			>
				trip
			</button>
			<button
				className="p-2 bg-cyan-200"
				onClick={() => dispatch(setAmountFilter({ amount: 12 }))}
			>
				amount
			</button> */}
		</div>
	);
}

export default App;
