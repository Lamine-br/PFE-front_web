import React from "react";
import { HeaderEmployeur, NavBarEmployeur, Candidature } from "../components";
import { useParams } from "react-router-dom";

export function CandidatureEmployeur() {
	let data = [
		{
			Id: "1",
			Candidat: "Brahami Lamine",
			"Titre de l'offre": "Jardinier",
			Statut: "En attente",
			"Date d'envoi": "13 Février 2024",
		},
	];

	let { id } = useParams();

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={1}></NavBarEmployeur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>
						Candidatures {">"} Candidature {id}
					</p>
				</div>
				<div className='mt-4'>
					<Candidature></Candidature>
				</div>
			</div>
		</div>
	);
}
