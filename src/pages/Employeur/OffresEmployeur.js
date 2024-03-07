import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	Tableau,
	NouvelleOffre,
	NouvelleCategorie,
} from "../../components";
import { axiosInstance } from "../../util/axios";

export function OffresEmployeur() {
	let [data, setData] = useState([]);

	async function getOffres() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/employeur/offres", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getOffres();
	}, []);

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
