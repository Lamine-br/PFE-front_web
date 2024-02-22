import React, { useState } from "react";
import { useEffect } from "react";
import { FaFlag, FaCheck, FaTimes, FaTag } from "react-icons/fa";
import { Popup } from "./Popup";
import { ButtonCarre } from "./ButtonCarre";

export function TableauGestionnaire({ data, onRowClick }) {
	const headers = Object.keys(data[0]);
	const numCols = headers.length + 1;

	const [showRefusConfirmation, setShowRefusConfirmation] = useState(false);

	return (
		<div className='w-full mt-6 space-y-1'>
			<div
				className={`grid grid-cols-${numCols} text-center bg-bleuF items-center p-2 rounded-lg`}
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
						className={`grid grid-cols-${numCols} text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
						onClick={() => onRowClick(item.Id)}
					>
						{headers.map((header, index) => (
							<p key={index} className='text-bleuF text-sm font-semibold'>
								{item[header]}
							</p>
						))}
						<div className='flex justify-center items-center space-x-4'>
							<>
								<FaFlag size={12} color='#465475' className='cursor-pointer' />
								<FaCheck
									size={12}
									color={"#30CA3F"}
									className='cursor-pointer'
								/>
								<FaTimes
									size={14}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={(e) => {
										e.stopPropagation();
										setShowRefusConfirmation(true);
									}}
								/>
							</>
						</div>
					</div>
				))}
			</div>

			{showRefusConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sur de vouloir refuser cette candidature ?"}
					onConfirm={() => setShowRefusConfirmation(false)}
					onDismiss={() => setShowRefusConfirmation(false)}
				/>
			)}
		</div>
	);
}
