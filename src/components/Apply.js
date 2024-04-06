import React, { useState, useEffect } from "react";
import { ButtonRond } from "./ButtonRond";
import { FaFileUpload } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { axiosInstance } from "../util/axios";

export function Apply({ data }) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [formData, setFormData] = useState({
		nom: "",
		prenom: "",
		date_naissance: "",
		nationalite: "",
		numero: "",
		email: "",
		ville: "",
		cv: "",
		motivation: "",
		commentaire: "",
	});

	async function getProfile() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/profile", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setFormData((prevFormData) => ({
					...prevFormData,
					nom: response.data.nom,
					prenom: response.data.prenom,
					date_naissance: response.data.date_naissance,
					nationalite: response.data.nationalite,
					numero: response.data.numero,
					email: response.data.email,
					ville: response.data.ville,
				}));
				console.log(data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	function handleInputChange(event, field) {
		const value = event.target.value;
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: value,
		}));
	}

	const redirectToProfile = () => {
		window.location.href = "/chercheur/profile";
	};

	return (
		<div className='overlay flex justify-center'>
			<div className='z-50 justify-center items-center p-4 w-full h-4/5 bg-bleuF rounded-lg'>
				<h1 className='text-xl text-violet font-bold mb-10 ml-4'>Postuler</h1>
				<div className='grid grid-cols-4 gap-8 mx-4 mb-10'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Nom</label>
						<input
							id='nomInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							value={formData.nom}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Prénom</label>
						<input
							id='prenomInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							value={formData.prenom}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Date de naissance
						</label>
						<input
							id='dateNaissanceInput'
							className='bg-violet border border-gray-400 rounded-md p-1 text-sm focus:outline-none focus:border-blue-500'
							type='date'
							value={formData.date_naissance}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Nationalité</label>
						<input
							id='nationaliteInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							value={formData.nationalite}
							readOnly
						></input>
					</div>
				</div>
				<div className='grid grid-cols-4 gap-8 mx-4 mb-20'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Numéro de téléphone
						</label>
						<input
							id='telephoneInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='tel'
							value={formData.numero}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Email</label>
						<input
							id='emailInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
							value={formData.email}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Ville</label>
						<input
							id='villeInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							value={formData.ville}
							readOnly
						></input>
					</div>
					<div className='flex space-x-2'>
						<BsInfoCircleFill color={"FF584D"} />
						<p className='text-rouge text-xs font-bold'>
							Pour modifier vos infos personnelles,{" "}
							<span
								className='hover:underline cursor-pointer'
								onClick={redirectToProfile}
							>
								cliquez ici
							</span>
						</p>
					</div>
				</div>

				<div className='grid grid-cols-4 gap-8 mx-4 mb-6'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Choisir ou saisir un CV :
						</label>
						<select className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'>
							<option value=''>Choisir un CV existant</option>
						</select>
					</div>
					<div className='flex flex-col'>
						<label
							htmlFor='fileInput'
							className='text-violet text-xs font-bold'
						>
							Déposez votre CV
						</label>
						<div className='relative '>
							<input
								type='file'
								id='fileInput'
								name='fileInput'
								accept='.csv, .xlsx, .xls ,.pdf'
								className='sr-only'
							/>
							<label
								htmlFor='fileInput'
								className='cursor-pointer flex items-center justify-center w-1/2 p-2 rounded-md bg-violet text-bleuF text-sm font-bold hover:bg-blue-100'
							>
								<FaFileUpload className='mr-2' /> Importer
							</label>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-4 gap-8 mx-4 mb-6'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Choisir ou saisir une motivation :
						</label>
						<br />
						<select className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'>
							<option value=''>Choisir une motivation existante</option>
						</select>
					</div>
					<div className='flex flex-col col-span-2'>
						<div className='flex flex-col col-span-2'>
							<textarea
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='4'
								type='text'
								id='motivationF'
							/>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-4 gap-8 mx-4 mb-6'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Choisir ou saisir un commentaire :
						</label>
						<select className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'>
							<option value=''>Choisir une commentaire</option>
						</select>
					</div>
					<div className='flex flex-col col-span-2'>
						<div className='flex flex-col col-span-2'>
							<textarea
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='4'
								type='text'
								id='commentaireF'
							/>
						</div>
					</div>
				</div>

				<div className='flex justify-end mr-4'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Continuer"}
						width={"w-1/4"}
						height={"fit"}
						onClick={() => {}}
					></ButtonRond>
				</div>
			</div>
		</div>
	);
}
