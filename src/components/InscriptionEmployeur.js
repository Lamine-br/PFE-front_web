import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { ButtonRond } from "./ButtonRond";
import { FaTimes, FaPlus } from "react-icons/fa";
import { axiosInstance } from "../util/axios";

export function InscriptionEmployeur({ onPass }) {
	const [formData, setFormData] = useState({
		entreprise: "",
		service: "",
		sous_service: "",
		numero_EDA: "",
		adresse: {
			rue: "",
			ville: "",
		},
		site_web: "",
		facebook: "",
		linkedin: "",
		contacts: [{ nom: "", email: "", numero: "" }],
	});

	const inputRefs = {
		entreprise: useRef(),
		service: useRef(),
		sous_service: useRef(),
		numero_EDA: useRef(),
		adresse: {
			rue: useRef(),
			ville: useRef(),
		},
		contacts: [
			{
				nom: useRef(),
				email: useRef(),
				numero: useRef(),
			},
		],
		site_web: useRef(),
		facebook: useRef(),
		linkedin: useRef(),
	};

	const handleInputChange = (e, index) => {
		const { name, value } = e.target;

		if (index !== undefined) {
			const newContacts = [...formData.contacts];
			newContacts[index][name] = value;

			setFormData((prevData) => ({
				...prevData,
				contacts: newContacts,
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleRemoveContact = (index) => {
		const newContacts = [...formData.contacts];
		newContacts.splice(index, 1);

		setFormData((prevData) => ({
			...prevData,
			contacts: newContacts,
		}));
	};

	async function register() {
		const response = await axiosInstance.post(`/auth/register/chercheur`, {
			formData,
		});

		if (response.data.statusCode === 200) {
			console.log(response.data.data);
		}
	}

	function handleClick() {
		const entrepriseValue = inputRefs.entreprise.current.value;
		const serviceValue = inputRefs.service.current.value;
		const sousServiceValue = inputRefs.sous_service.current.value;
		const numeroEDAValue = inputRefs.numero_EDA.current.value;
		const rueValue = inputRefs.adresse.rue.current.value;
		const villeValue = inputRefs.adresse.ville.current.value;
		const siteWebValue = inputRefs.site_web.current.value;
		const facebookValue = inputRefs.facebook.current.value;
		const linkedinValue = inputRefs.linkedin.current.value;
		const contactValue = {
			nom: inputRefs.contacts[0].nom.current.value,
			email: inputRefs.contacts[0].email.current.value,
			numero: inputRefs.contacts[0].numero.current.value,
		};

		setFormData({
			entreprise: entrepriseValue,
			service: serviceValue,
			sous_service: sousServiceValue,
			numero_EDA: numeroEDAValue,
			adresse: {
				rue: rueValue,
				ville: villeValue,
			},
			site_web: siteWebValue,
			facebook: facebookValue,
			linkedin: linkedinValue,
			contacts: [contactValue],
		});
		console.log(formData);
	}

	return (
		<div className='overlay flex justify-center items-center w-full'>
			<div className='z-50 justify-center items-center p-4 w-3/4 h-4/5 bg-bleuF rounded-lg'>
				<h1 className='text-xl text-violet font-bold mb-6 ml-4'>
					S'inscrire - Employeur
				</h1>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom de l'entreprise / Employeur
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.entreprise}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom d’un service/département
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.service}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom d’un sous service/sous département
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.sous_service}
						></input>
					</div>
				</div>

				<div className='grid grid-cols-5 gap-8 mx-4 mb-10'>
					<div className='flex flex-col col-span-3'>
						<label className='text-violet text-xs font-bold'>
							Numéro nationale de l’entité dépositaire d’annonces
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.numero_EDA}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Adresse</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.adresse.rue}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Ville</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.adresse.ville}
						></input>
					</div>
				</div>

				<p className='text-violet text-sm font-bold ml-4 mb-2'>Contacts</p>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Nom</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.contacts[0].nom}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Email</label>
						<input
							className=' bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
							ref={inputRefs.contacts[0].email}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Numero</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='tel'
							ref={inputRefs.contacts[0].numero}
						></input>
					</div>
				</div>

				<p className='text-violet text-sm font-bold ml-4 mb-2'>Liens publics</p>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-6'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Site web</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.site_web}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Facebook</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.facebook}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Linkedin</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.linkedin}
						></input>
					</div>
				</div>

				<div className='flex justify-end mr-4'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Continuer"}
						width={"w-1/4"}
						height={"fit"}
						onClick={handleClick}
					></ButtonRond>
				</div>
			</div>
		</div>
	);
}
