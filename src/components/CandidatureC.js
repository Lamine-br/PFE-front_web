import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaFlag } from "react-icons/fa";
import { FiEdit, FiExternalLink } from "react-icons/fi";
import { ButtonRond } from "./ButtonRond";
import cv from "../assets/cv.png";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";
import { MotivationForm } from "./MotivationForm";
import { CommentaireForm } from "./CommentaireForm";
import { Map } from "./Map";
import { axiosInstance } from "../util/axios";

export function CandidatureC({
	candidature,
	onDelete,
	onContact,
	onUpdate,
	onAccept,
	onRefuse,
	onDeclareProblem,
}) {
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
	const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
	const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
	const [showDeclareProblem, setShowDeclareProblem] = useState(false);
	const [showMap, setShowMap] = useState(false);
	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/candidatures");
			if (response.status === 200) {
				console.log(response.data);
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getUrl();
	}, []);

	const handleExternalLinkClick = () => {
		window.open(url + candidature.dossier.cv, "_blank");
	};

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
					<ButtonRond
						couleur={"bleuF"}
						couleurTexte={"violet"}
						contenu={"Itinéraire"}
						width={"fit"}
						height={"h-8"}
						onClick={() => setShowMap(true)}
					></ButtonRond>
					<ButtonRond
						couleur={"bleuF"}
						couleurTexte={"violet"}
						contenu={<FaFlag />}
						width={"fit"}
						height={"h-8"}
						onClick={() => setShowDeclareProblem(true)}
					></ButtonRond>
					<div>
						<FaEllipsisV />
					</div>
				</div>
			</div>
			<div className='grid grid-cols-4 gap-x-4 mt-6'>
				{candidature.dossier ? (
					candidature.dossier.cv ? (
						<div>
							<FiExternalLink
								size={10}
								color={"#FF584D"}
								className='cursor-pointer'
								onClick={handleExternalLinkClick}
							/>
							<object
								data={candidature.dossier ? url + candidature.dossier.cv : ""}
								type='application/pdf'
								width='100%'
								height='400px'
							/>
						</div>
					) : (
						"Aucun CV"
					)
				) : (
					""
				)}

				<div className='px-10 col-span-3 space-y-6 '>
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
							{candidature.status === "En attente" ? (
								<FiEdit
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => setShowMotivationForm(true)}
								/>
							) : (
								""
							)}
						</div>

						<p className='text-sm text-bleuF'>
							{candidature.dossier ? candidature.dossier.motivation : ""}
						</p>
					</div>
					<div>
						<div className='flex items-center space-x-2'>
							<p className='text-bleuF font-bold'>Commentaires</p>
							{candidature.status === "En attente" ? (
								<FiEdit
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => setShowCommentaireForm(true)}
								/>
							) : (
								""
							)}
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
			{candidature.status === "Validé" ? (
				<div className='flex justify-end m-4 space-x-2'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Refuser"}
						width={"fit"}
						height={"fit"}
						onClick={() => setShowRefuseConfirmation(true)}
					/>
					<ButtonRond
						couleur={"vertF"}
						couleurTexte={"violet"}
						contenu={"Accepter"}
						width={"fit"}
						height={"fit"}
						onClick={() => setShowAcceptConfirmation(true)}
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
					titre={"Contacter"}
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
			{showRefuseConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir refuser cette candidature ?"}
					onConfirm={() => {
						onRefuse(candidature._id);
					}}
					onDismiss={() => setShowRefuseConfirmation(false)}
				/>
			)}
			{showAcceptConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir d'accepter cette candidature ?"}
					onConfirm={() => {
						onAccept(candidature._id);
					}}
					onDismiss={() => setShowAcceptConfirmation(false)}
				/>
			)}
			{showDeclareProblem && (
				<MessageTab
					titre={"Déclarer un problème"}
					onConfirm={(titre, contenu) =>
						onDeclareProblem(candidature._id, titre, contenu)
					}
					onDismiss={() => setShowDeclareProblem(false)}
				/>
			)}
			{showMap && <Map data={{}} onDismiss={() => setShowMap(false)} />}
		</div>
	);
}
