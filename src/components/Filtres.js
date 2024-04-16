import React, { useState, useRef, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { FaPlus } from "react-icons/fa";
import { axiosInstance } from "../util/axios";
import moment from "moment";

export function Filtres({ data, onConfirm, onDismiss }) {
	const [startDate, setStartDate] = useState("");

	const handleStartDateChange = (e) => {
		const selectedDate = e.target.value;
		setStartDate(selectedDate);
	};

	const [selectedEmployeur, setSelectedEmployeur] = useState("");
	const [employeurs, setEmployeurs] = useState([]);
	const [selectedEmployeurs, setSelectedEmployeurs] = useState([]);

	const addEmployeur = (selectedIndex) => {
		if (selectedIndex !== "") {
			const selectedEmployeur = employeurs[selectedIndex];
			const alreadySelected = selectedEmployeurs.find(
				(employeur) => employeur._id === selectedEmployeur._id
			);

			if (!alreadySelected) {
				const updatedSelectedEmployeurs = [...selectedEmployeurs];
				updatedSelectedEmployeurs.push(selectedEmployeur);
				setSelectedEmployeurs(updatedSelectedEmployeurs);
			}
		}
	};

	const deleteEmployeur = (index) => {
		const updatedSelectedEmployeurs = [...selectedEmployeurs];
		updatedSelectedEmployeurs.splice(index, 1);
		setSelectedEmployeurs(updatedSelectedEmployeurs);
	};

	async function getEmployeurs() {
		try {
			const response = await axiosInstance.get("/users/employeurs");

			console.log(response);

			if (response.status === 200) {
				setEmployeurs(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const [selectedMetier, setSelectedMetier] = useState("");
	const [metiers, setMetiers] = useState([]);
	const [selectedMetiers, setSelectedMetiers] = useState([]);

	const addMetier = (selectedIndex) => {
		if (selectedIndex !== "") {
			const selectedMetier = metiers[selectedIndex];
			const alreadySelected = selectedMetiers.find(
				(metier) => metier._id === selectedMetier._id
			);

			if (!alreadySelected) {
				const updatedSelectedMetiers = [...selectedMetiers];
				updatedSelectedMetiers.push(selectedMetier);
				setSelectedMetiers(updatedSelectedMetiers);
			}
		}
	};

	const deleteMetier = (index) => {
		const updatedSelectedMetiers = [...selectedMetiers];
		updatedSelectedMetiers.splice(index, 1);
		setSelectedMetiers(updatedSelectedMetiers);
	};

	async function getMetiers() {
		try {
			const response = await axiosInstance.get("/offres/metiers");

			console.log(response);

			if (response.status === 200) {
				setMetiers(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getMetiers();
		getEmployeurs();
	}, []);

	const handleSubmit = async () => {
		const filteredData = data.filter((item) => {
			return (
				(!startDate ||
					moment(item.createdAt).isSame(moment(startDate), "day")) &&
				(selectedEmployeurs.length === 0 ||
					selectedEmployeurs.some(
						(employeur) => employeur._id === item.offre.employeur
					)) &&
				(selectedMetiers.length === 0 ||
					selectedMetiers.some((metier) => metier._id === item.offre.metier))
			);
		});
		onConfirm(filteredData);
		onDismiss();
	};

	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='w-1/2 h-fit bg-white p-4 rounded-md space-y-4'>
				<h1 className='text-xl text-bleuF font-bold mb-10'>
					Filtrer mes candidatures
				</h1>
				<div className='flex flex-col gap-10 mt-8'>
					<div className='flex flex-col'>
						<div className='flex w-full justify-between space-x-2'>
							<div className='flex flex-col flex-grow'>
								<select
									className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									onChange={(e) => setSelectedMetier(e.target.value)}
								>
									<option value=''>Sélectionnez un métier</option>
									{metiers.map((item, index) => (
										<option key={item._id} value={index}>
											{item.nom}
										</option>
									))}
								</select>
							</div>
							<ButtonCarre
								couleur='bleuF'
								couleurTexte={"violet"}
								contenu={<FaPlus />}
								width={"fit text-sm"}
								height={"fit"}
								onclick={() => {
									addMetier(selectedMetier);
									console.log(selectedMetiers);
								}}
							></ButtonCarre>
						</div>
						<div>
							<table>
								<thead>
									<tr>
										<th>Liste des métiers</th>
									</tr>
								</thead>
								<tbody>
									{selectedMetiers.map((item, index) => (
										<tr key={index} className='justify-between'>
											<td>{item.nom}</td>
											<td>
												<p
													className='hover:underline text-rouge text-xs cursor-pointer'
													onClick={() => deleteMetier(index)}
												>
													Supp
												</p>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className='flex flex-col'>
						<div className='flex w-full justify-between space-x-2'>
							<div className='flex flex-col flex-grow'>
								<select
									className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									onChange={(e) => setSelectedEmployeur(e.target.value)}
								>
									<option value=''>Sélectionnez un employeur</option>
									{employeurs.map((item, index) => (
										<option key={item._id} value={index}>
											{item.entreprise}
										</option>
									))}
								</select>
							</div>
							<ButtonCarre
								couleur='bleuF'
								couleurTexte={"violet"}
								contenu={<FaPlus />}
								width={"fit text-sm"}
								height={"fit"}
								onclick={() => {
									addEmployeur(selectedEmployeur);
									console.log(selectedEmployeurs);
								}}
							></ButtonCarre>
						</div>
						<div>
							<table>
								<thead>
									<tr>
										<th>Liste des employeurs</th>
									</tr>
								</thead>
								<tbody>
									{selectedEmployeurs.map((item, index) => (
										<tr key={index}>
											<td>{item.entreprise}</td>
											<td>
												<p
													className='hover:underline text-rouge text-xs cursor-pointer'
													onClick={() => deleteEmployeur(index)}
												>
													Supp
												</p>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-8 mb-10'>
						<div className='flex flex-col'>
							<label className='text-bleuF text-xs font-bold'>
								Date d'envoi
							</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='date'
								value={startDate}
								onChange={handleStartDateChange}
							></input>
						</div>
					</div>
				</div>

				<div className='flex justify-end mt-10'>
					<div className='flex space-x-2'>
						<ButtonCarre
							couleur='bleuF'
							couleurTexte={"violet"}
							contenu={"Annuler"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={() => onDismiss()}
						></ButtonCarre>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Filtrer"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={() => handleSubmit()}
						></ButtonCarre>
					</div>
				</div>
			</div>
		</div>
	);
}
