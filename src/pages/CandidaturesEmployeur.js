import React, { useState } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	Tableau,
} from "../components";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { FaSearch } from "react-icons/fa";

export function CandidaturesEmployeur() {
	let data = [
		{
			Id: "1",
			Candidat: "Brahami Lamine",
			"Titre de l'offre": "Jardinier",
			"Date d'envoi": "13 Février 2024",
		},
		{
			Id: "2",
			Candidat: "Brahami Lamine",
			"Titre de l'offre": "Jardinier",
			"Date d'envoi": "13 Février 2024",
		},
		{
			Id: "3",
			Candidat: "Brahami Lamine",
			"Titre de l'offre": "Jardinier",
			"Date d'envoi": "13 Février 2024",
		},
		{
			Id: "4",
			Candidat: "Brahami Lamine",
			"Titre de l'offre": "Jardinier",
			"Date d'envoi": "13 Février 2024",
		},
		{
			Id: "5",
			Candidat: "Brahami Lamine",
			"Titre de l'offre": "Jardinier",
			"Date d'envoi": "13 Février 2024",
		},
		{
			Id: "6",
			Candidat: "Brahami Lamine",
			"Titre de l'offre": "Jardinier",
			"Date d'envoi": "13 Février 2024",
		},
		{
			Id: "7",
			Candidat: "Brahami Lamine",
			"Titre de l'offre": "Jardinier",
			"Date d'envoi": "13 Février 2024",
		},
		{
			Id: "8",
			Candidat: "Brahami Lamine",
			"Titre de l'offre": "Jardinier",
			"Date d'envoi": "13 Février 2024",
		},
	];

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	};

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
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
							onclick={() => {}}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<Tableau data={data} type={"candidatures"}></Tableau>
				</div>
			</div>
		</div>
	);
}
