import React, { useState } from "react";
import { ButtonRond } from "./ButtonRond";
import { FaFileUpload } from "react-icons/fa";
import { axiosInstance } from "../util/axios";

export function InscriptionChercheur() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		image: "",
		nom: "",
		prenom: "",
		date_naissance: "",
		nationalite: "",
		numero: "",
		ville: "",
		cv: "Hi",
	});

	function handleInputChange(event, field) {
		const value = event.target.value;
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: value,
		}));
	}

	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
		console.log(file);
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setPreviewUrl(null);
		}
	};

	const handleUpload = async () => {
		if (selectedFile) {
			const formData = new FormData();
			formData.append("image", selectedFile);

			try {
				const response = await axiosInstance.post("/auth/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				if (response.request.status === 200) {
					setFormData((prevFormData) => ({
						...prevFormData,
						["image"]: response.data,
					}));
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		} else {
			console.log("Please select a file.");
		}
	};

	async function submitData() {
		try {
			const response = await axiosInstance.post(
				`/auth/register/chercheur`,
				formData
			);

			if (response.request.status === 200) {
				console.log(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleSubmit = async () => {
		await handleUpload();
		console.log(formData);
		submitData();
	};

	return (
		<div className='overlay flex justify-center w-full'>
			<div className='z-50 justify-center items-center p-4 w-3/4 h-4/5 bg-bleuF rounded-lg'>
				<h1 className='text-xl text-violet font-bold mb-6 ml-4'>
					S'inscrire - Chercheur d'emplois
				</h1>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-10'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Email <span className='text-rouge'>*</span>
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
							onChange={(e) => handleInputChange(e, "email")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Mot de passe <span className='text-rouge'>*</span>
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='password'
							onChange={(e) => handleInputChange(e, "password")}
						></input>
					</div>
					<div>
						<input type='file' onChange={handleFileChange} />
						{previewUrl && (
							<img
								src={previewUrl}
								alt='Preview'
								className='w-20 h-20 rounded-full'
							/>
						)}
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-10'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom <span className='text-rouge'>*</span>
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							onChange={(e) => handleInputChange(e, "nom")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Prénom <span className='text-rouge'>*</span>
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							onChange={(e) => handleInputChange(e, "prenom")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Date de naissance <span className='text-rouge'>*</span>
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 text-sm focus:outline-none focus:border-blue-500'
							type='date'
							onChange={(e) => handleInputChange(e, "date_naissance")}
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-10'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nationalité <span className='text-rouge'>*</span>
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							onChange={(e) => handleInputChange(e, "nationalite")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Ville</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							onChange={(e) => handleInputChange(e, "ville")}
						></input>
					</div>

					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Numéro de téléphone
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='tel'
							onChange={(e) => handleInputChange(e, "numero")}
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-6'>
					<div>
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
								accept='.csv, .xlsx, .xls'
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

				<div className='flex justify-end mr-4'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Continuer"}
						width={"w-1/4"}
						height={"fit"}
						onClick={() => handleSubmit()}
					></ButtonRond>
				</div>
			</div>
		</div>
	);
}
