import React, { useState, useEffect } from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	TableauEmployeurs,
	TableauChercheurs,
} from "../../components";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../util/axios";

export function UtilisateursGestionnaire() {
	const [employeurs, setEmployeurs] = useState([]);
	const [chercheurs, setChercheurs] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getUtilisateurs() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/users");

			console.log(response);

			if (response.request.status === 200) {
				setEmployeurs(response.data.employeurs);
				setChercheurs(response.data.chercheurs);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function bloquer(type, id) {
		try {
			const response = await axiosInstance.post(`/users/bloquerUser`, {
				type,
				id,
			});

			if (response.status === 200) {
				console.log(response.data);
				getUtilisateurs();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function debloquer(type, id) {
		try {
			const response = await axiosInstance.post(`/users/debloquerUser`, {
				type,
				id,
			});

			if (response.status === 200) {
				console.log(response.data);
				getUtilisateurs();
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getUtilisateurs();
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
		window.location.href = `/gestionnaire/utilisateurs/${id}`;
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={1}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Utilisateurs</p>
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
								<MenuItem value={"employeurs"}>Employeurs</MenuItem>
								<MenuItem value={"chercheurs"}>Chercheurs</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
				<div>
					{selectedValue === "employeurs" ? (
						<TableauEmployeurs
							data={employeurs}
							onRowClick={handleClick}
							onBloque={(id) => bloquer("employeur", id)}
							onDebloque={(id) => debloquer("employeur", id)}
						></TableauEmployeurs>
					) : (
						""
					)}

					{selectedValue === "chercheurs" ? (
						<TableauChercheurs
							data={chercheurs}
							onRowClick={handleClick}
							onBloque={(id) => bloquer("chercheur", id)}
							onDebloque={(id) => debloquer("chercheur", id)}
						></TableauChercheurs>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
