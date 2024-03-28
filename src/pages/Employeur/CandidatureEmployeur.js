import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	Candidature,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function CandidatureEmployeur() {
	// let data = [
	// 	{
	// 		Id: "1",
	// 		Candidat: "Brahami Lamine",
	// 		"Titre de l'offre": "Jardinier",
	// 		Statut: "En attente",
	// 		"Date d'envoi": "13 Février 2024",
	// 	},
	// ];
	const [data, setData] = useState({});
	const [reponses, setReponses] = useState([]);
	const [loading, setLoading] = useState(false);

	let { id } = useParams();

	async function getDetails() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get(
				"/employeur/candidatures/" + id,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				setLoading(false);
				console.log(data);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getReponses() {
		try {
			const response = await axiosInstance.get(
				`/chercheur/candidatures/${id}/reponses`
			);
			console.log(response);

			if (response.request.status === 200) {
				setReponses(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getDetails();
		console.log(data);
		getReponses();
	}, []);

	const couleur = (emetteur) => {
		switch (emetteur) {
			case "chercheur":
				return "violet";
			case "employeur":
				return "[#007bff]";
			default:
				return "";
		}
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={1}></NavBarEmployeur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>
						Candidatures {">"} {data.offre ? data.offre.titre : ""}
					</p>
				</div>
				<div className='mt-4'>
					<Candidature candidature={data}></Candidature>
				</div>
				<div className='space-y-2 mt-2'>
					<p className='text-bleuF font-bold text-xl'>Conversation</p>
					{reponses.map((item, index) => (
						<div
							key={index}
							className={`flex flex-col space-y-1 border border-bleuF rounded-lg p-2 bg-${couleur(
								item.type_emetteur
							)}`}
						>
							<div className='flex justify-between'>
								<p className='text-bleuF font-semibold'>{item.titre}</p>
								<p className='text-bleuF'>
									{item.createdAt.split("T")[0]} |{" "}
									{item.createdAt.split("T")[1].split(".")[0]}
								</p>
							</div>
							<p className='text-sm text-bleuF'>{item.contenu}</p>
						</div>
					))}
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
