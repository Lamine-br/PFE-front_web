import React, { useState } from "react";
import {
	FaTrash,
	FaPen,
	FaFolder,
	FaCheck,
	FaTimes,
	FaTag,
} from "react-icons/fa";
import { ButtonCarre } from "./ButtonCarre";

export function Tableau({ data, type, onRowClick }) {
	const headers = Object.keys(data[0]);

	const [numCols, setNumCols] = useState(headers.length + 1);

	const [showConfirmation, setShowConfirmation] = useState(false);

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
						className={`grid grid-cols-${numCols} text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
						onClick={() => onRowClick(item.Id)}
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
										onClick={(e) => {
											e.stopPropagation();
											setShowConfirmation(true);
										}}
									/>
								</>
							) : (
								<>
									<FaTag size={12} color='#465475' className='cursor-pointer' />
									<FaCheck
										size={12}
										color={
											item["Statut"] === "En attente" ? "#30CA3F" : "#CCCCCC"
										}
										className='cursor-pointer'
									/>
									<FaTimes
										size={14}
										color={
											item["Statut"] === "En attente" ? "#FF584D" : "#CCCCCC"
										}
										className='cursor-pointer'
									/>
								</>
							)}
						</div>
					</div>
				))}
			</div>
			{showConfirmation && (
				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
					<div className=' w-1/4 h-fit bg-white p-4 rounded-md space-y-8'>
						<p>Êtes-vous sûr de vouloir supprimer cette offre?</p>
						<div className='flex justify-between'>
							<ButtonCarre
								couleur={"bleuF"}
								couleurTexte={"violet"}
								contenu={"Annuler"}
								width={"fit text-xs"}
								height={"fit"}
								onclick={() => setShowConfirmation(false)}
							></ButtonCarre>
							<ButtonCarre
								couleur={"rouge"}
								couleurTexte={"violet"}
								contenu={"Supprimer"}
								width={"fit text-xs"}
								height={"fit"}
								onclick={() => setShowConfirmation(false)}
							></ButtonCarre>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
