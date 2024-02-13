import React from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	Tableau,
} from "../components";

export function OffresEmployeur() {
	let data = [
		{ Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Titre: "Jardinier", "Date de création": "13 Février 2024" },
	];

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={0}></NavBarEmployeur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Mes offres</p>
					<div className='flex space-x-4'>
						<ButtonCarre
							couleur='bleuF'
							couleurTexte={"violet"}
							contenu={"Nouvelle catégorie"}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => {}}
						></ButtonCarre>

						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Nouvelle offre"}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => {}}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<Tableau data={data} type={"offres"}></Tableau>
				</div>
			</div>
		</div>
	);
}
