import React from "react";
import { useState } from "react";
import { ButtonRond } from "./ButtonRond";
import { CadreAbonnement } from "./CadreAbonnement";

export function Abonnements({ onPass }) {
	const abonnements = [
		{
			type: "ponctuel",
			prix: "5 EURO",
			offres: "Une",
			partage: "Limité",
		},
		{
			type: "mensuel",
			prix: "30 EURO",
			offres: "Illimité",
			partage: "Illimité",
		},
		{
			type: "trimestriel",
			prix: "80 EURO",
			offres: "Illimité",
			partage: "Illimité",
		},
		{
			type: "semestriel",
			prix: "150 EURO",
			offres: "Illimité",
			partage: "Illimité",
		},
		{
			type: "annuel",
			prix: "300 EURO",
			offres: "Illimité",
			partage: "Illimité",
		},
		{
			type: "illimité",
			prix: "Offre = 2 EURO",
			offres: "Illimité",
			partage: "Illimité",
		},
	];

	const [cadreSelectionne, setCadreSelectionne] = useState(null);

	const handleSelectionCadre = (index) => {
		setCadreSelectionne(index);
	};

	return (
		<div className='overlay flex justify-center'>
			<div className='z-50 justify-center items-center p-4 w-3/4 h-4/5 bg-bleuF rounded-lg'>
				<h1 className='text-xl text-violet font-bold mb-6 ml-4'>
					Sélectionnez l'offre qui vous correspond
				</h1>

				<div className='grid grid-cols-3 gap-x-8 gap-y-4 mx-4 mb-6'>
					{[1, 2, 3, 4, 5, 6].map((index) => (
						<CadreAbonnement
							key={index}
							abonnement={abonnements[index - 1]}
							className={`${
								cadreSelectionne === index ? "border-2 border-red-500" : ""
							}`}
							onClick={() => handleSelectionCadre(index)}
						></CadreAbonnement>
					))}
				</div>

				<div className='flex justify-end mr-4'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Continuer"}
						width={"w-1/4"}
						height={"fit"}
						onClick={onPass}
					></ButtonRond>
				</div>
			</div>
		</div>
	);
}
