import React, { useState } from "react";
import { FaTimes, FaCheck, FaEnvelope, FaTrash } from "react-icons/fa";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";

export function TableauCandidaturesChercheur({
	data,
	onRowClick,
	onDelete,
	onContact,
	vide,
}) {
	const [selectedCandidature, setSelectedCandidature] = useState(null);

	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
	const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
	const [showMessageTab, setShowMessageTab] = useState(false);

	return (
		<div>
			<div className='w-full mt-6 space-y-1'>
				{data.length === 0 ? (
					<>
						<div
							className={`grid grid-cols-4 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Offre</p>
							<p className='text-violet text-sm font-bold'>Date d'envoi</p>
							<p className='text-violet text-sm font-bold'>
								Date de traitement
							</p>

							<p className='text-violet text-sm font-bold'>Actions</p>
						</div>
						<p className='text-bleuF text-lg font-bold'>
							{vide ? "Aucune candidature" : ""}
						</p>
					</>
				) : (
					<>
						<div
							className={`grid grid-cols-4 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Offre</p>
							<p className='text-violet text-sm font-bold'>Date d'envoi</p>
							<p className='text-violet text-sm font-bold'>
								Date de traitement
							</p>

							<p className='text-violet text-sm font-bold'>Actions</p>
						</div>
						<div className='w-full space-y-1 '>
							{data.map((item, itemIndex) => (
								<div
									key={itemIndex}
									className={`grid grid-cols-4 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
									onClick={() => onRowClick(item._id)}
								>
									<p className='text-bleuF text-sm font-semibold'>
										{item.offre.titre}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.createdAt.split("T")[0]}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.date_traitement || "-"}
									</p>

									<div className='flex justify-center items-center space-x-4'>
										<>
											<FaEnvelope
												size={14}
												color={"#465475"}
												className='cursor-pointer'
												onClick={(e) => {
													setSelectedCandidature(item._id);
													e.stopPropagation();
													setShowMessageTab(true);
												}}
											/>
											{item.status === "En attente" ? (
												<FaTrash
													size={14}
													color={"#FF584D"}
													className='cursor-pointer'
													onClick={(e) => {
														setSelectedCandidature(item._id);
														console.log(item._id);
														e.stopPropagation();
														setShowDeleteConfirmation(true);
													}}
												/>
											) : (
												""
											)}
											{item.status === "Accepté" ? (
												<>
													<FaTrash
														size={14}
														color={"#FF584D"}
														className='cursor-pointer'
														onClick={(e) => {
															setSelectedCandidature(item._id);
															console.log(item._id);
															e.stopPropagation();
															setShowDeleteConfirmation(true);
														}}
													/>
												</>
											) : (
												""
											)}
										</>
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>
			{showMessageTab && (
				<MessageTab
					onConfirm={(titre, contenu) =>
						onContact(selectedCandidature, titre, contenu)
					}
					onDismiss={() => setShowMessageTab(false)}
				/>
			)}

			{showRefuseConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir refuser cette candidature ?"}
					onConfirm={() => {}}
					onDismiss={() => setShowRefuseConfirmation(false)}
				/>
			)}

			{showAcceptConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir d'accepter cette candidature ?"}
					onConfirm={() => {}}
					onDismiss={() => setShowAcceptConfirmation(false)}
				/>
			)}
			{showDeleteConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir supprimer cette candidature ?"}
					onConfirm={() => onDelete(selectedCandidature)}
					onDismiss={() => setShowDeleteConfirmation(false)}
				/>
			)}
		</div>
	);
}