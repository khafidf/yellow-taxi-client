import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { allModalDataSelector, setClose } from "../../redux/slice/mapSlice";

export default function Modal() {
	const mapDatas = useSelector(allModalDataSelector);
	const dispatch = useDispatch();

	const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${
		import.meta.env.VITE_MAPS_API_KEY
	}&origin=${mapDatas.pickup.latitude},${
		mapDatas.pickup.longitude
	}&destination=${mapDatas.dropoff.latitude},${
		mapDatas.dropoff.longitude
	}&mode=driving`;

	return (
		<Dialog
			open={mapDatas.open}
			onClose={() => dispatch(setClose({ open: false }))}
			className="relative z-10"
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<div className="px-4 pt-5 pb-2 bg-white sm:p-6 sm:pb-4">
							<div>
								<div className="mt-3 text-left sm:mt-0">
									<DialogTitle
										as="h3"
										className="mb-2 text-lg font-semibold text-center text-gray-900"
									>
										Details Trip
									</DialogTitle>
									<div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
										<div>
											<p className="font-medium text-gray-600">Vendor:</p>
											<p>{mapDatas.vendor}</p>
										</div>
										<div>
											<p className="font-medium text-gray-600">Distance:</p>
											<p>{mapDatas.distance}</p>
										</div>
										<div>
											<p className="font-medium text-gray-600">Fare Amount:</p>
											<p>{mapDatas.fareAmount}</p>
										</div>
										<div>
											<p className="font-medium text-gray-600">Pickup Date:</p>
											<p>{mapDatas.pickupDate}</p>
										</div>
										<div>
											<p className="font-medium text-gray-600">Dropoff Date:</p>
											<p>{mapDatas.dropoffDate}</p>
										</div>
									</div>
									<iframe
										src={mapUrl}
										allowFullScreen
										loading="lazy"
										className="w-full h-full mt-2 border-0"
										title="Embedded Google Map"
									/>
								</div>
							</div>
						</div>
						<div className="px-4 pt-2 pb-5 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								onClick={() => dispatch(setClose({ open: false }))}
								className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-yellow-400 rounded-md shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
							>
								Close
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
