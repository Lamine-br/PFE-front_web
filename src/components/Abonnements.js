import React from "react";
import { useState, useEffect } from "react";
import { ButtonRond } from "./ButtonRond";
import { CadreAbonnement } from "./CadreAbonnement";
import { Spinner } from "./Spinner";
import { axiosInstance } from "../util/axios";

export function Abonnements({ onPass }) {
	const [abonnements, setAbonnements] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getAbonnements() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/abonnements");

			console.log(response);

			if (response.request.status === 200) {
				setAbonnements(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}
	// const abonnements = [
	// 	{
	// 		type: "ponctuel",
	// 		prix: "5 EURO",
	// 		offres: "Une",
	// 		partage: "Limité",
	// 	},
	// 	{
	// 		type: "mensuel",
	// 		prix: "30 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// 	{
	// 		type: "trimestriel",
	// 		prix: "80 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// 	{
	// 		type: "semestriel",
	// 		prix: "150 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// 	{
	// 		type: "annuel",
	// 		prix: "300 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// 	{
	// 		type: "illimité",
	// 		prix: "Offre = 2 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// ];

	useEffect(() => {
		getAbonnements();
	}, []);

	const [cadreSelectionne, setCadreSelectionne] = useState(null);

	const handleSelectionCadre = (index) => {
		setCadreSelectionne(index);
	};

	return (
		<div className='overlay flex items-center justify-center w-full'>
			<div className='z-50 justify-center items-center p-4 w-3/4 h-4/5 bg-white rounded-lg border border-bleuF'>
				<h1 className='text-xl text-bleuF font-bold mb-6 ml-4'>
					Sélectionnez l'offre qui vous correspond
				</h1>

				<div className='grid grid-cols-3 gap-x-8 gap-y-4 mx-4 mb-6'>
					{abonnements.map((item, index) => (
						<CadreAbonnement
							key={index}
							abonnement={item}
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

			{loading && <Spinner />}
		</div>
	);
}
