import React, { useState } from "react";
import { FaTimes, FaCheck, FaEnvelope } from "react-icons/fa";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";

export function TableauCandidaturesEmployeur({ data, onRowClick, vide }) {
	const [selectedId, setSelectedId] = useState(null);

	const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
	const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
	const [showMessageTab, setShowMessageTab] = useState(false);

	return (
		<div>
			<div className='w-full mt-6 space-y-1'>
				{data.length === 0 ? (
					<>
						<div
							className={`grid grid-cols-5 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Candidat</p>
							<p className='text-violet text-sm font-bold'>Titre de l'offre</p>
							<p className='text-violet text-sm font-bold'>Date</p>
							<p className='text-violet text-sm font-bold'>Statut</p>

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
							<p className='text-violet text-sm font-bold'>Candidat</p>
							<p className='text-violet text-sm font-bold'>Titre de l'offre</p>
							<p className='text-violet text-sm font-bold'>Date</p>
							<p className='text-violet text-sm font-bold'>Statut</p>

							<p className='text-violet text-sm font-bold'>Actions</p>
						</div>
						<div className='w-full space-y-1'>
							{data.map((item, itemIndex) => (
								<div
									key={itemIndex}
									className={`grid grid-cols-5 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
									onClick={() => onRowClick(item._id)}
								>
									<p className='text-bleuF text-sm font-semibold'>
										{item.chercheur.nom} {item.chercheur.prenom}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.offre.titre}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.createdAt.split("T")[0]}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.status}
									</p>

									<div className='flex justify-center items-center space-x-4'>
										<>
											<FaEnvelope
												size={14}
												color={"#465475"}
												className='cursor-pointer'
												onClick={(e) => {
													setSelectedId(item._id);
													console.log(item._id);
													e.stopPropagation();
													setShowMessageTab(true);
												}}
											/>
											{item.status === "En attente" ? (
												<>
													<FaCheck
														size={12}
														color={"#30CA3F"}
														className='cursor-pointer'
														onClick={(e) => {
															setSelectedId(item._id);
															console.log(item._id);
															e.stopPropagation();
															setShowAcceptConfirmation(true);
														}}
													/>
													<FaTimes
														size={14}
														color={"#FF584D"}
														className='cursor-pointer'
														onClick={(e) => {
															setSelectedId(item._id);
															console.log(item._id);
															e.stopPropagation();
															setShowRefuseConfirmation(true);
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
					onConfirm={() => {}}
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
		</div>
	);
}
