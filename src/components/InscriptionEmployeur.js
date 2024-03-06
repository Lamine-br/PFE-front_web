import React, { useState, useRef, useEffect } from "react";
import { ButtonRond } from "./ButtonRond";
import { FaTimes, FaPlus } from "react-icons/fa";
import { axiosInstance } from "../util/axios";

export function InscriptionEmployeur({ onPass }) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
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
		email: useRef(),
		password: useRef(),
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

	async function register() {
		const response = await axiosInstance.post(
			`/auth/register/employeur`,
			formData
		);

		if (response.data.statusCode === 200) {
			console.log(response.data.data);
		}
	}

	function handleInputChange(event, field, nestedField) {
		const value = event.target.value;
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: nestedField
				? {
						...prevFormData[field],
						[nestedField]: value,
				  }
				: value,
		}));
	}

	function handleContactChange(event, index, field) {
		const value = event.target.value;
		setFormData((prevFormData) => {
			const newContacts = [...prevFormData.contacts];
			newContacts[index] = {
				...newContacts[index],
				[field]: value,
			};
			return {
				...prevFormData,
				contacts: newContacts,
			};
		});
	}

	function addContact() {
		setFormData((prevFormData) => ({
			...prevFormData,
			contacts: [
				...prevFormData.contacts,
				{
					nom: "",
					email: "",
					numero: "",
				},
			],
		}));
	}

	function removeContact(index) {
		setFormData((prevFormData) => ({
			...prevFormData,
			contacts: prevFormData.contacts.filter((_, i) => i !== index),
		}));
	}

	function handleClick() {
		console.log(formData);
		register();
	}

	return (
		<div className='overlay flex justify-center items-center w-full'>
			<div className='z-50 justify-center items-center p-4 w-3/4 h-4/5 bg-bleuF rounded-lg'>
				<h1 className='text-xl text-violet font-bold mb-6 ml-4'>
					S'inscrire - Employeur
				</h1>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Email</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
							ref={inputRefs.email}
							onChange={(e) => handleInputChange(e, "email")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Mot de passe
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='password'
							ref={inputRefs.password}
							onChange={(e) => handleInputChange(e, "password")}
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom de l'entreprise / Employeur
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.entreprise}
							onChange={(e) => handleInputChange(e, "entreprise")}
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
							onChange={(e) => handleInputChange(e, "service")}
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
							onChange={(e) => handleInputChange(e, "sous_service")}
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
							onChange={(e) => handleInputChange(e, "numero_EDA")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Adresse</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.adresse.rue}
							onChange={(e) => handleInputChange(e, "adresse", "rue")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Ville</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.adresse.ville}
							onChange={(e) => handleInputChange(e, "adresse", "ville")}
						></input>
					</div>
				</div>

				<p className='text-violet text-sm font-bold ml-4 mb-2'>Contacts</p>

				{formData.contacts.map((contact, index) => (
					<div key={index} className='grid grid-cols-3 gap-8 mx-4 mb-4'>
						<div className='flex flex-col'>
							<label className='text-violet text-xs font-bold'>Nom</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='text'
								value={contact.nom}
								onChange={(e) => handleContactChange(e, index, "nom")}
								ref={inputRefs.contacts[index].nom}
							></input>
						</div>
						<div className='flex flex-col'>
							<label className='text-violet text-xs font-bold'>Email</label>
							<input
								className=' bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='email'
								value={contact.email}
								onChange={(e) => handleContactChange(e, index, "email")}
								ref={inputRefs.contacts[index].email}
							></input>
						</div>
						<div className='flex flex-col'>
							<label className='text-violet text-xs font-bold'>Numero</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='tel'
								value={contact.numero}
								onChange={(e) => handleContactChange(e, index, "numero")}
								ref={inputRefs.contacts[index].numero}
							></input>
						</div>
						{index > 0 && (
							<div className='flex items-center'>
								<FaTimes
									className='text-red-500 cursor-pointer'
									onClick={() => removeContact(index)}
								/>
							</div>
						)}
					</div>
				))}

				<p className='text-violet text-sm font-bold ml-4 mb-2'>Liens publics</p>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-6'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Site web</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.site_web}
							onChange={(e) => handleInputChange(e, "site_web")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Facebook</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.facebook}
							onChange={(e) => handleInputChange(e, "facebook")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Linkedin</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={inputRefs.linkedin}
							onChange={(e) => handleInputChange(e, "linkedin")}
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
