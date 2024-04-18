import React, { useState } from "react";
import {
	FaTimes,
	FaCheck,
	FaEnvelope,
	FaTrash,
	FaCalendarPlus,
} from "react-icons/fa";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";

export function TableauEmploisEmployeur({ data, onRowClick, vide }) {
	const [selectedEmploi, setSelectedEmploi] = useState(null);

	const [showAddToAgenda, setShowAddToAgenda] = useState(false);

	return (
		<div>
			<div className='w-full mt-6 space-y-1'>
				{data.length === 0 ? (
					<>
						<div
							className={`grid grid-cols-5 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Offre</p>
							<p className='text-violet text-sm font-bold'>Candidat</p>
							<p className='text-violet text-sm font-bold'>Date debut</p>
							<p className='text-violet text-sm font-bold'>Date fin</p>
							<p className='text-violet text-sm font-bold'>Actions</p>
						</div>
						<p className='text-bleuF text-lg font-bold'>
							{vide ? "Aucune candidature" : ""}
						</p>
					</>
				) : (
					<>
						<div
							className={`grid grid-cols-5 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Offre</p>
							<p className='text-violet text-sm font-bold'>Candidat</p>
							<p className='text-violet text-sm font-bold'>Date debut</p>
							<p className='text-violet text-sm font-bold'>Date fin</p>
							<p className='text-violet text-sm font-bold'>Attestation</p>
						</div>
						<div className='w-full space-y-1 '>
							{data.map((item, itemIndex) => (
								<div
									key={itemIndex}
									className={`grid grid-cols-5 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
									onClick={() => onRowClick(item._id)}
								>
									<p className='text-bleuF text-sm font-semibold'>
										{item.offre.titre}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.chercheur.nom} {item.chercheur.prenom}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.offre.debut}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.offre.fin}
									</p>

									<div className='flex justify-center items-center space-x-4'>
										{item.attestation ? (
											<>
												<FaCalendarPlus
													size={12}
													color={"#30CA3F"}
													className='cursor-pointer'
													onClick={(e) => {
														setSelectedEmploi(item._id);
														console.log(item._id);
														e.stopPropagation();
														setShowAddToAgenda(true);
													}}
												/>
											</>
										) : (
											""
										)}
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>

			{showAddToAgenda && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir ajouter cet emploi à votre agenda ?"}
					onConfirm={() => {}}
					onDismiss={() => setShowAddToAgenda(false)}
				/>
			)}
		</div>
	);
}
