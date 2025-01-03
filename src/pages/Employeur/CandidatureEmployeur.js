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
				"/candidatures/employeur/" + id,
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
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get(
				`/candidatures/employeur/${id}/reponses`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response);

			if (response.status === 200) {
				setReponses(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function contact(id, titre, contenu) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/employeur/${id}/contact`,
				{
					titre,
					contenu,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getReponses();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function validate(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/employeur/validate`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getDetails();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function refuse(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/employeur/refuse`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getDetails();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function signal(titre, contenu, destinataire) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			let type_destinataire = "chercheur";
			const response = await axiosInstance.post(
				`/users/signaler`,
				{ titre, contenu, destinataire, type_destinataire },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getDetails();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function bloque(motif, destinataire) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			let type_destinataire = "chercheur";
			const response = await axiosInstance.post(
				`/users/bloquer`,
				{ motif, destinataire, type_destinataire },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getDetails();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function addEtiquetteToCandidature(nom, id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/employeur/etiquettes/addToCandidature`,
				{ nom, id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getDetails();
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
				return "bleu";
			default:
				return "";
		}
	};

	const position = (emetteur) => {
		switch (emetteur) {
			case "chercheur":
				return "justify-start";
			case "employeur":
				return "justify-end";
			default:
				return "";
		}
	};

	return (
		<div className='min-h-screen pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={1}></NavBarEmployeur>
			<div className='mx-6 my-2 bg-white rounded-lg p-4 border shadow'>
				<div className='flex'>
					<p className='text-xl font-bold text-bleuF'>
						Candidatures {">"} {data.offre ? data.offre.titre : ""}
					</p>
					<span
						className={`text-xl ${
							data.status === "En attente" ? "text-bleuF" : ""
						} ${
							data.status === "Refusé" || data.status === "Supprimé"
								? "text-rouge"
								: ""
						}${data.status === "Validé" ? "text-[#ffc107]" : ""} ${
							data.status === "Validé Validé" ? "text-vertF" : ""
						} text-sm font-semibold`}
					>
						{data.status === "En attente" ? " En attente" : ""}
						{data.status === "Refusé" ? " Refusée" : ""}
						{data.status === "Supprimé" ? " Supprimée" : ""}
						{data.status === "Validé" ? " (Validée)" : ""}
						{data.status === "Validé Validé" ? " Validé par le chercheur" : ""}
					</span>
				</div>
				<div className='mt-4'>
					<Candidature
						candidature={data}
						onContact={contact}
						onAccept={validate}
						onRefuse={refuse}
						onSignal={signal}
						onBloque={bloque}
						onAddEtiquette={addEtiquetteToCandidature}
					></Candidature>
				</div>
				<div className='space-y-2 mt-2'>
					<p className='text-bleuF font-bold text-xl'>Conversation</p>
					{reponses.map((item, index) => (
						<div className={`flex ${position(item.type_emetteur)}`}>
							<div
								key={index}
								className={`flex flex-col w-1/2 space-y-1 border border-bleuF rounded-lg p-2 bg-${couleur(
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
						</div>
					))}
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
