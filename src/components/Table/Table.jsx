import { CompactTable } from "@table-library/react-table-library/compact";
import Filter from "../Filter/Filter.jsx";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import Pagination from "../Pagination/Pagination.jsx";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { allTaxiSelector } from "../../redux/slice/taxiSlice.js";
import { useAllTaxiDataQuery } from "../../redux/api/taxi/taxiSlice.js";
import { setData } from "../../redux/slice/dataSlice.js";
import { setModalData } from "../../redux/slice/mapSlice.js";

const Table = () => {
	const dispatch = useDispatch();
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

	const taxiQuery = useSelector(allTaxiSelector);
	const { data, isLoading, refetch } = useAllTaxiDataQuery(taxiQuery);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		dispatch(
			setData({
				pagination: data?.pagination,
				response: data?.response,
				status: data?.status,
			})
		);
	}, [data?.pagination, data?.response, data?.status, dispatch, refetch]);

	const node = data?.response.map((_, index) => ({
		..._,
		id: index,
	}));

	const COLUMNS = [
		{ label: "Vendor", renderCell: (item) => item.vendor_id, pinLeft: true },
		{
			label: "Pickup",
			renderCell: (item) => {
				const dateDropoff = new Date(item.pickup_datetime);

				return dateDropoff.toLocaleDateString("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				});
			},
		},
		{
			label: "Dropoff",
			renderCell: (item) => {
				const dateDropoff = new Date(item.dropoff_datetime);

				return dateDropoff.toLocaleDateString("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				});
			},
		},
		{
			label: "Distance",
			renderCell: (item) => `${Math.round(item.trip_distance * 10) / 10} km`,
		},
		{ label: "Fare Amount", renderCell: (item) => `${item.fare_amount}$` },
		{
			label: "Action",
			renderCell: (item) => (
				<button
					className="p-1 text-white bg-yellow-400"
					onClick={() => dispatch(setModalData({ data: item, open: true }))}
				>
					Show Map!
				</button>
			),
			pinRight: true,
		},
	];

	const theme = useTheme([
		getTheme(),
		{
			Table: `
            --data-table-library_grid-template-columns:  ${
							isSmallScreen
								? `25% 30% 30% 30% 30% 25%`
								: `20% 15% 15% 15% 15% 20%`
						};
          `,
			BaseCell: `
            &:nth-of-type(1) {
              left: 0px;
            }
            &:nth-of-type(6) {
              right: -1px;
            }

             text-align: center;
             padding: 8px 16px;
          `,
		},
	]);

	return (
		<div className="bg-yellow-400 h-fit">
			<div className="container py-16 mx-auto">
				{/* Judul dan filter */}
				<div className="flex flex-col">
					<h2 className="text-2xl font-semibold text-center text-white">
						List Trip
					</h2>
					{/* Filter */}
					<Filter />
				</div>
				{/* Tabel */}
				{!isLoading ? (
					<div className="px-4">
						<CompactTable
							columns={COLUMNS}
							data={{ nodes: node || [] }}
							theme={theme}
							layout={{ custom: true, horizontalScroll: true }}
						/>
						<Modal />
					</div>
				) : (
					<div className="h-[46vh] flex px-4">
						<h2 className="flex items-center justify-center w-full font-bold text-center text-yellow-400 bg-white">
							Loading...
						</h2>
					</div>
				)}
				{/* Pagination */}
				<div className="px-4 mt-2">
					<Pagination />
				</div>
			</div>
		</div>
	);
};

export default Table;
