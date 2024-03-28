import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { ButtonRond } from "./ButtonRond";
import cv from "../assets/cv.png";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";
import { MotivationForm } from "./MotivationForm";
import { CommentaireForm } from "./CommentaireForm";

export function CandidatureC({ candidature, onDelete, onContact, onUpdate }) {
	// let Candidature = {
	// 	Id: "1",
	// 	Candidat: "Brahami Lamine",
	// 	"Titre de l'offre": "Jardinier",
	// 	Statut: "En attente",
	// 	"Date d'envoi": "13 Février 2024",
	// };
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [showMessageTab, setShowMessageTab] = useState(false);
	const [showMotivationForm, setShowMotivationForm] = useState(false);
	const [showCommentaireForm, setShowCommentaireForm] = useState(false);

	return (
		<div className='w-full bg-violet rounded-lg px-10 py-4'>
			<div className='flex'>
				<div>
					<p className='text-bleuF font-bold text-xl'>
						{candidature.chercheur ? candidature.chercheur.nom : ""}{" "}
						{candidature.chercheur ? candidature.chercheur.prenom : ""}
					</p>
					<div className='flex'>
						<p className='text-bleuF'>
							{candidature.createdAt ? candidature.createdAt.split("T")[0] : ""}
						</p>
						<p className='text-bleuF ml-4'>Alger</p>
					</div>
				</div>
				<div className='flex items-center space-x-6 ml-auto my-auto'>
					<ButtonRond
						couleur={"violet"}
						couleurTexte={"bleuF"}
						contenu={"Répondre"}
						width={"fit border border-bleuF"}
						height={"h-8"}
						onClick={() => setShowMessageTab(true)}
					></ButtonRond>
					<div>
						<FaEllipsisV />
					</div>
				</div>
			</div>
			<div className='grid grid-cols-4 gap-x-4'>
				<div className='mt-2'>
					<img className='bg-white w-full h-96 rounded-lg' src={cv}></img>
				</div>
				<div className='px-10 col-span-3 space-y-6'>
					<p className='text-bleuF font-bold text-lg'>A propos du condidat</p>
					<div className='grid grid-cols-4'>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Nom</p>
							<p className='text-sm text-bleuF'>
								{candidature.chercheur ? candidature.chercheur.nom : ""}
							</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Prénom</p>
							<p className='text-sm text-bleuF'>
								{candidature.chercheur ? candidature.chercheur.prenom : ""}
							</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Nationalité</p>
							<p className='text-sm text-bleuF'>
								{candidature.chercheur ? candidature.chercheur.nationalite : ""}
							</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Ville</p>
							<p className='text-sm text-bleuF'>
								{candidature.chercheur ? candidature.chercheur.ville : ""}
							</p>
						</div>
					</div>
					<div>
						<div className='flex items-center space-x-2'>
							<p className='text-bleuF font-bold'>Motivation</p>
							<FiEdit
								size={10}
								color={"#FF584D"}
								className='cursor-pointer'
								onClick={() => setShowMotivationForm(true)}
							/>
						</div>

						<p className='text-sm text-bleuF'>
							{candidature.dossier ? candidature.dossier.motivation : ""}
						</p>
					</div>
					<div>
						<div className='flex items-center space-x-2'>
							<p className='text-bleuF font-bold'>Commentaires</p>
							<FiEdit
								size={10}
								color={"#FF584D"}
								className='cursor-pointer'
								onClick={() => setShowCommentaireForm(true)}
							/>
						</div>
						<p className='text-sm text-bleuF'>
							{candidature.dossier ? candidature.dossier.commentaire : ""}
						</p>
					</div>
				</div>
			</div>

			{candidature.status === "En attente" ? (
				<div className='flex justify-end m-4 space-x-2'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Supprimer"}
						width={"fit"}
						height={"fit"}
						onClick={() => {
							setShowDeleteConfirmation(true);
						}}
					/>
				</div>
			) : (
				""
			)}
			{candidature.status === "Accepté" ? (
				<div className='flex justify-end m-4 space-x-2'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Refuser"}
						width={"fit"}
						height={"fit"}
						onClick={() => {}}
					/>
					<ButtonRond
						couleur={"vertF"}
						couleurTexte={"violet"}
						contenu={"Accepter"}
						width={"fit"}
						height={"fit"}
						onClick={() => {}}
					/>
				</div>
			) : (
				""
			)}
			{showDeleteConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir supprimer cette candidature ?"}
					onConfirm={() => onDelete(candidature._id)}
					onDismiss={() => setShowDeleteConfirmation(false)}
				/>
			)}
			{showMessageTab && (
				<MessageTab
					onConfirm={(titre, contenu) =>
						onContact(candidature._id, titre, contenu)
					}
					onDismiss={() => setShowMessageTab(false)}
				/>
			)}
			{showMotivationForm && (
				<MotivationForm
					data={candidature.dossier.motivation}
					onConfirm={(motivation) =>
						onUpdate(candidature._id, "", motivation, "")
					}
					onDismiss={() => setShowMotivationForm(false)}
				/>
			)}
			{showCommentaireForm && (
				<CommentaireForm
					data={candidature.dossier.commentaire}
					onConfirm={(commentaire) =>
						onUpdate(candidature._id, "", "", commentaire)
					}
					onDismiss={() => setShowCommentaireForm(false)}
				/>
			)}
		</div>
	);
}
