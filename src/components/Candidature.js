import React from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import cv from "../assets/cv.png";

export function Candidature() {
	let Candidature = {
		Id: "1",
		Candidat: "Brahami Lamine",
		"Titre de l'offre": "Jardinier",
		Statut: "En attente",
		"Date d'envoi": "13 Février 2024",
	};

	return (
		<div className='w-full bg-violet rounded-lg px-10 py-4'>
			<div className='flex'>
				<div>
					<p className='text-bleuF font-bold text-xl'>{Candidature.Candidat}</p>
					<div className='flex'>
						<p className='text-bleuF'>{Candidature["Date d'envoi"]}</p>
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
							<p className='text-sm text-bleuF'>Brahami</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Prénom</p>
							<p className='text-sm text-bleuF'>Lamine</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Nationalité</p>
							<p className='text-sm text-bleuF'>Algérienne</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Ville</p>
							<p className='text-sm text-bleuF'>Alger</p>
						</div>
					</div>
					<div>
						<p className='text-bleuF font-bold'>Motivation</p>
						<p className='text-sm text-bleuF'>
							Madame, Monsieur, Je me permets de vous adresser ma candidature
							pour le poste de Développeur Web pour la refontre de votre site
							web. Titulaire d'un diplôme en [votre domaine d'études, par
							exemple, informatique], je possède une solide expérience dans le
							développement web...
						</p>
					</div>
					<div>
						<p className='text-bleuF font-bold'>Commentaires</p>
						<p className='text-sm text-bleuF'>
							Je suis impatient(e) de discuter de la manière dont mes
							compétences peuvent répondre à vos besoins spécifiques et de
							contribuer à l'atteinte des objectifs de [nom de l'entreprise].
							Merci de considérer ma candidature.
						</p>
					</div>
				</div>
			</div>

			{Candidature["Statut"] === "En attente" ? (
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
						couleur={"bleuF"}
						couleurTexte={"violet"}
						contenu={"Accepter"}
						width={"fit"}
						height={"fit"}
						onClick={() => {}}
					/>
				</div>
			) : null}
		</div>
	);
}
