import React, { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { Popup } from "./Popup";

export function TableauOffres({ data, onRowClick, onDelete, onModify, vide }) {
	const [selectedId, setSelectedId] = useState(null);

	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	return (
		<div className='w-full mt-6 space-y-1'>
			{data.length === 0 ? (
				<>
					<div
						className={`grid grid-cols-6 text-center bg-bleuF items-center p-2 rounded-lg`}
					>
						<p className='text-violet text-sm font-bold'>Titre</p>
						<p className='text-violet text-sm font-bold'>Métier</p>
						<p className='text-violet text-sm font-bold'>Début</p>
						<p className='text-violet text-sm font-bold'>Fin</p>
						<p className='text-violet text-sm font-bold'>Date de publication</p>
						<p className='text-violet text-sm font-bold'>Actions</p>
					</div>
					<p className='text-bleuF text-lg font-bold'>
						{vide ? "Pas d'offre disponible" : ""}
					</p>
				</>
			) : (
				<>
					<div
						className={`grid grid-cols-6 text-center bg-bleuF items-center p-2 rounded-lg`}
					>
						<p className='text-violet text-sm font-bold'>Titre</p>
						<p className='text-violet text-sm font-bold'>Métier</p>
						<p className='text-violet text-sm font-bold'>Début</p>
						<p className='text-violet text-sm font-bold'>Fin</p>
						<p className='text-violet text-sm font-bold'>Date de publication</p>
						<p className='text-violet text-sm font-bold'>Actions</p>
					</div>
					<div className='w-full space-y-1'>
						{data.map((item, itemIndex) => (
							<div
								key={itemIndex}
								className={`grid grid-cols-6 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
								onClick={() => onRowClick(item._id)}
							>
								<p className='text-bleuF text-sm font-semibold'>{item.titre}</p>
								<p className='text-bleuF text-sm font-semibold'>
									{item.metier}
								</p>
								<p className='text-bleuF text-sm font-semibold'>{item.debut}</p>
								<p className='text-bleuF text-sm font-semibold'>{item.fin}</p>
								<p className='text-bleuF text-sm font-semibold'>{item.date}</p>

								<div className='flex justify-center items-center space-x-4'>
									<>
										<FaPen
											size={12}
											color={"#465475"}
											className='cursor-pointer'
											onClick={(e) => {
												setSelectedId(item._id);
												console.log(item._id);
												e.stopPropagation();
												onModify(item._id);
											}}
										/>
										<FaTrash
											size={12}
											className='cursor-pointer'
											color='#FF584D'
											onClick={(e) => {
												setSelectedId(item._id);
												console.log(item._id);
												e.stopPropagation();
												setShowDeleteConfirmation(true);
											}}
										/>
									</>
								</div>
							</div>
						))}
					</div>
				</>
			)}

			{showDeleteConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir supprimer cette offre ?"}
					onConfirm={() => onDelete(selectedId)}
					onDismiss={() => setShowDeleteConfirmation(false)}
				/>
			)}
		</div>
	);
}
