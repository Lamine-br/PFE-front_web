import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	ButtonCarre,
	TableauCandidaturesChercheur,
	NouvelleEtiquette,
} from "../../components";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../util/axios";

export function CandidaturesChercheur() {
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

	async function getCandidatures() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/chercheur/candidatures");

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				if (response.data.length === 0) {
					setVide(true);
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	async function deleteCandidature(id) {
		try {
			setLoading(true);
			const response = await axiosInstance.delete(
				"/chercheur/candidatures/" + id
			);

			if (response.request.status === 200) {
				setLoading(false);
				getCandidatures();
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function contact(id, titre, contenu) {
		try {
			const response = await axiosInstance.post(
				`/chercheur/candidatures/${id}/contact`,
				{
					titre,
					contenu,
				}
			);

			if (response.request.status === 201) {
				console.log(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getCandidatures();
	}, []);

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	};

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleClick = (id) => {
		window.location.href = `/chercheur/candidatures/${id}`;
	};

	const [showNouvelleEtiquette, setShowNouvelleEtiquette] = useState(false);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur selected={0}></NavBarChercheur>
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
								<MenuItem value={"option1"}>Toutes</MenuItem>
								<MenuItem value={"option2"}>Refusée</MenuItem>
							</Select>
						</FormControl>
						<ButtonCarre
							couleur='bleuF'
							couleurTexte={"violet"}
							contenu={"Nouvelle étiquette"}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => setShowNouvelleEtiquette(true)}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<TableauCandidaturesChercheur
						data={data}
						onRowClick={handleClick}
						onDelete={deleteCandidature}
						onContact={contact}
					></TableauCandidaturesChercheur>
				</div>
			</div>

			{showNouvelleEtiquette && (
				<NouvelleEtiquette onClose={() => setShowNouvelleEtiquette(false)} />
			)}
		</div>
	);
}
