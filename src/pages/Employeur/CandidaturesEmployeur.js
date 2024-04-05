import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	TableauCandidaturesEmployeur,
	Spinner,
} from "../../components";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../util/axios";

export function CandidaturesEmployeur() {
	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);
	let [idOffre, setIdOffre] = useState(null);
	// let data = [
	// 	{
	// 		Id: "1",
	// 		Candidat: "Brahami Lamine",
	// 		"Titre de l'offre": "Jardinier",
	// 		Statut: "En attente",
	// 		"Date d'envoi": "13 Février 2024",
	// 	},
	// 	{
	// 		Id: "2",
	// 		Candidat: "Brahami Lamine",
	// 		"Titre de l'offre": "Jardinier",
	// 		Statut: "En attente",
	// 		"Date d'envoi": "13 Février 2024",
	// 	},
	// 	{
	// 		Id: "3",
	// 		Candidat: "Brahami Lamine",
	// 		"Titre de l'offre": "Jardinier",
	// 		Statut: "Refusée",
	// 		"Date d'envoi": "13 Février 2024",
	// 	},
	// 	{
	// 		Id: "4",
	// 		Candidat: "Brahami Lamine",
	// 		"Titre de l'offre": "Jardinier",
	// 		Statut: "Acceptée",
	// 		"Date d'envoi": "13 Février 2024",
	// 	},
	// 	{
	// 		Id: "5",
	// 		Candidat: "Brahami Lamine",
	// 		"Titre de l'offre": "Jardinier",
	// 		Statut: "En attente",
	// 		"Date d'envoi": "13 Février 2024",
	// 	},
	// 	{
	// 		Id: "6",
	// 		Candidat: "Brahami Lamine",
	// 		"Titre de l'offre": "Jardinier",
	// 		Statut: "Refusée",
	// 		"Date d'envoi": "13 Février 2024",
	// 	},
	// 	{
	// 		Id: "7",
	// 		Candidat: "Brahami Lamine",
	// 		"Titre de l'offre": "Jardinier",
	// 		Statut: "Acceptée",
	// 		"Date d'envoi": "13 Février 2024",
	// 	},
	// 	{
	// 		Id: "8",
	// 		Candidat: "Brahami Lamine",
	// 		"Titre de l'offre": "Jardinier",
	// 		Statut: "En attente",
	// 		"Date d'envoi": "13 Février 2024",
	// 	},
	// ];

	async function getCandidatures(type) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/employeur/candidatures", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				if (response.data.length === 0) {
					setVide(true);
				} else {
					if (!type) {
						setData(response.data);
					} else {
						switch (type) {
							case "Refusées":
								const refusedData = response.data.filter(
									(item) => item.status === "Refusé"
								);
								setData(refusedData);
								break;
							case "Validées":
								const validatedData = response.data.filter(
									(item) => item.status === "Validé"
								);
								setData(validatedData);
								break;
							case "En attente":
								const dataEnAttente = response.data.filter(
									(item) => item.status === "En attente"
								);
								setData(dataEnAttente);
								break;
							case "Toutes":
								setData(response.data);
								break;
							default:
								const defaultData = response.data.filter(
									(item) => item.valide === "En attente"
								);
								setData(defaultData);
								break;
						}
					}
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	useEffect(() => {
		getCandidatures();
	}, []);

	async function validate(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/employeur/candidatures/validate`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.request.status === 201) {
				console.log(response.data);
				getCandidatures();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function refuse(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/employeur/candidatures/refuse`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.request.status === 201) {
				console.log(response.data);
				getCandidatures();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function contact(id, titre, contenu) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/employeur/candidatures/${id}/contact`,
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

			if (response.request.status === 201) {
				console.log(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		getCandidatures(event.target.value);
	};

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleClick = (id) => {
		window.location.href = `/employeur/candidatures/${id}`;
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={1}></NavBarEmployeur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Candidatures</p>
					<div className='flex space-x-4'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Rechercher'
								className='h-9 px-4 border rounded-md outline-none focus:border-blue-500'
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							<button className='absolute right-3 top-1/2 transform -translate-y-1/2'>
								<FaSearch color='#465475' />
							</button>
						</div>
						<FormControl className='h-9'>
							<Select
								value={selectedValue}
								onChange={handleChange}
								displayEmpty
								className='select-empty h-full'
							>
								<MenuItem value='' disabled>
									Sélectionner
								</MenuItem>
								<MenuItem value={"Toutes"}>Toutes</MenuItem>
								<MenuItem value={"En attente"}>En attente</MenuItem>
								<MenuItem value={"Validées"}>Validées</MenuItem>
								<MenuItem value={"Refusées"}>Refusées</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
				<div>
					<TableauCandidaturesEmployeur
						data={data}
						onRowClick={handleClick}
						onAccept={validate}
						onRefuse={refuse}
						onContact={contact}
						vide={vide}
					></TableauCandidaturesEmployeur>
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
