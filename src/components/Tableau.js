import React from "react";
import {
	FaTrash,
	FaPen,
	FaFolder,
	FaCheck,
	FaTimes,
	FaTag,
} from "react-icons/fa";

export function Tableau({ data, type }) {
	const headers = Object.keys(data[0]);

	return (
		<div className='w-full mt-6 space-y-1'>
			<div
				className={`grid grid-cols-${
					headers.length + 1
				} text-center bg-bleuF items-center p-2 rounded-lg`}
			>
				{headers.map((header, index) => (
					<p key={index} className='text-violet text-sm font-bold'>
						{header}
					</p>
				))}
				<p className='text-violet text-sm font-bold'>Actions</p>
			</div>
			<div className='w-full space-y-1'>
				{data.map((item, itemIndex) => (
					<div
						key={itemIndex}
						className={`grid grid-cols-${
							headers.length + 1
						} text-center justify-center bg-violet items-center p-2 rounded-lg`}
					>
						{headers.map((header, index) => (
							<p key={index} className='text-bleuF text-sm font-semibold'>
								{item[header]}
							</p>
						))}
						<div className='col-span-1 flex justify-center items-center space-x-4'>
							{type === "offres" ? (
								<>
									<FaFolder
										size={14}
										color={"#465475"}
										className='cursor-pointer'
									/>
									<FaPen
										size={12}
										color={"#465475"}
										className='cursor-pointer'
									/>
									<FaTrash
										size={12}
										className='cursor-pointer'
										color='#FF584D'
									/>
								</>
							) : (
								<>
									<FaTag size={12} color='#465475' className='cursor-pointer' />
									<FaCheck
										size={12}
										color='#30CA3F'
										className='cursor-pointer'
									/>
									<FaTimes
										size={14}
										color='#FF584D'
										className='cursor-pointer'
									/>
								</>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
