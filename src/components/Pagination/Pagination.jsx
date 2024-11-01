import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	pageTaxiSelector,
	setPagePagination,
} from "../../redux/slice/taxiSlice";

const Pagination = () => {
	const page = useSelector(pageTaxiSelector);
	const dispatch = useDispatch();

	const incrementDecrement = (sign = "") => {
		if (sign == "plus") {
			const newPage = Number(page) + 1;
			dispatch(setPagePagination({ page: newPage }));
		} else {
			const newPage = Number(page) - 1;
			dispatch(setPagePagination({ page: newPage }));
		}
	};

	return (
		<div className="flex justify-end">
			<div className="flex items-center gap-4 text-white bg-yellow-500 border-2 border-white w-fit">
				{/* left */}
				<div
					className={`${
						page == "1"
							? "pointer-events-none bg-yellow-400/10 cursor-default"
							: "bg-yellow-400 cursor-pointer"
					} p-2 bg-yellow-400 border-r-2 border-white`}
					onClick={incrementDecrement}
				>
					<FaChevronLeft size={20} />
				</div>
				{/* number */}
				<span className="font-semibold cursor-default">{page}</span>
				{/* right */}
				<div
					className="p-2 bg-yellow-400 border-l-2 border-white cursor-pointer"
					onClick={() => incrementDecrement("plus")}
				>
					<FaChevronRight size={20} />
				</div>
			</div>
		</div>
	);
};

export default Pagination;
