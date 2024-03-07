import React, { useState } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	Tableau,
	NouvelleOffre,
	NouvelleCategorie,
} from "../../components";

export function OffresEmployeur() {
	let data = [
		{ Id: "1", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "2", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "3", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "4", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "5", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "6", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "7", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "8", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "9", Titre: "Jardinier", "Date de création": "13 Février 2024" },
	];

	const handleClick = (id) => {
		window.location.href = `/employeur/offres/${id}`;
	};

	const [showNouvelleOffre, setShowNouvelleOffre] = useState(false);
	const [showNouvelleCategorie, setShowNouvelleCategorie] = useState(false);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={0}></NavBarEmployeur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Mes offres</p>
					<div className='flex space-x-4'>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Nouvelle offre"}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => setShowNouvelleOffre(true)}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<Tableau
						data={data}
						type={"offres"}
						onRowClick={handleClick}
					></Tableau>
				</div>
			</div>

			{showNouvelleOffre && (
				<NouvelleOffre onClose={() => setShowNouvelleOffre(false)} />
			)}

			{showNouvelleCategorie && (
				<NouvelleCategorie onClose={() => setShowNouvelleCategorie(false)} />
			)}
		</div>
	);
}
