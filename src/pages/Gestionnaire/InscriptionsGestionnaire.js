import React, { useState } from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	TableauGestionnaire,
} from "../../components";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { FaSearch } from "react-icons/fa";

export function InscriptionsGestionnaire() {
	let data = [
		{
			Id: "1",
			Nom: "Brahami Lamine",
			Type: "Chercheur d'emplois",
			"Date d'envoi": "13 Février 2024",
		},
		{
			Id: "2",
			Nom: "ESI",
			Type: "Agence",
			"Date d'envoi": "22 Février 2024",
		},
		{
			Id: "3",
			Nom: "LIRMM",
			Type: "Agence",
			"Date d'envoi": "22 Février 2024",
		},
		{
			Id: "4",
			Nom: "KPMG",
			Type: "Employeur",
			"Date d'envoi": "22 Février 2024",
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

	const handleClick = (id) => {
		window.location.href = `/`;
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={0}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Inscriptions</p>
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
					</div>
				</div>
				<div>
					<TableauGestionnaire
						data={data}
						onRowClick={handleClick}
					></TableauGestionnaire>
				</div>
			</div>
		</div>
	);
}
