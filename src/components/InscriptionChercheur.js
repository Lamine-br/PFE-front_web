import React, { useState } from "react";
import { ButtonRond } from "./ButtonRond";
import { FaFileUpload } from "react-icons/fa";
import { axiosInstance } from "../util/axios";
import { Spinner } from "./Spinner";
import { InscriptionConfirmation } from "./InscriptionConfirmation";

export function InscriptionChercheur() {
	const [loading, setLoading] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
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

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [nomError, setNomError] = useState("");
	const [prenomError, setPrenomError] = useState("");
	const [dateNaissanceError, setDateNaissanceError] = useState("");
	const [nationaliteError, setNationaliteError] = useState("");
	const [villeError, setVilleError] = useState("");

	function validateForm() {
		let isValid = true;

		if (formData.email.trim() === "") {
			setEmailError("Email est requis");
			isValid = false;
		} else {
			setEmailError("");
		}

		if (formData.password.trim() === "") {
			setPasswordError("Mot de passe est requis");
			isValid = false;
		} else {
			setPasswordError("");
		}

		if (formData.nom.trim() === "") {
			setNomError("Nom est requis");
			isValid = false;
		} else {
			setNomError("");
		}

		if (formData.prenom.trim() === "") {
			setPrenomError("Prénom est requis");
			isValid = false;
		} else {
			setPrenomError("");
		}

		if (formData.date_naissance.trim() === "") {
			setDateNaissanceError("Date de naissance est requise");
			isValid = false;
		} else {
			setDateNaissanceError("");
		}

		if (formData.nationalite.trim() === "") {
			setNationaliteError("Nationalité est requise");
			isValid = false;
		} else {
			setNationaliteError("");
		}

		if (formData.ville.trim() === "") {
			setVilleError("Ville est requise");
			isValid = false;
		} else {
			setVilleError("");
		}
		return isValid;
	}

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
			setUploaded(false);
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
			setLoading(true);
			const data = new FormData();
			data.append("image", selectedFile);

			try {
				const response = await axiosInstance.post("/auth/upload", data, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				console.log(response);
				if (response.status === 200) {
					console.log("done");
					setFormData((prevFormData) => ({
						...prevFormData,
						["image"]: response.data,
					}));
					console.log(formData);
					setUploaded(true);

					setLoading(false);
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
			console.log(formData);
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
		await submitData();
	};

	async function sendCode() {
		const email = formData.email;
		const response = await axiosInstance.post(`/auth/code`, { email });

		if (response.request.status === 200) {
			console.log(response.data);
		}
	}

	function handleClick() {
		console.log(formData);
		const isValid = validateForm();

		if (isValid) {
			setLoading(true);
			sendCode();
			setTimeout(() => {
				setLoading(false);
				setShowConfirmation(true);
			}, 1000);
		}
	}

	return (
		<div className='overlay flex justify-center items-center w-full'>
			{!showConfirmation && (
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
								onFocus={() => setEmailError("")}
							></input>
							<p className='text-rouge text-xs'>{emailError}</p>
						</div>
						<div className='flex flex-col'>
							<label className='text-violet text-xs font-bold'>
								Mot de passe <span className='text-rouge'>*</span>
							</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='password'
								onChange={(e) => handleInputChange(e, "password")}
								onFocus={() => setPasswordError("")}
							></input>
							<p className='text-rouge text-xs'>{passwordError}</p>
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
							{!uploaded && <button onClick={handleUpload}>Upload</button>}
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
								onFocus={() => setNomError("")}
							></input>
							<p className='text-rouge text-xs'>{nomError}</p>
						</div>
						<div className='flex flex-col'>
							<label className='text-violet text-xs font-bold'>
								Prénom <span className='text-rouge'>*</span>
							</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='text'
								onChange={(e) => handleInputChange(e, "prenom")}
								onFocus={() => setPrenomError("")}
							></input>
							<p className='text-rouge text-xs'>{prenomError}</p>
						</div>
						<div className='flex flex-col'>
							<label className='text-violet text-xs font-bold'>
								Date de naissance <span className='text-rouge'>*</span>
							</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 text-sm focus:outline-none focus:border-blue-500'
								type='date'
								onChange={(e) => handleInputChange(e, "date_naissance")}
								onFocus={() => setDateNaissanceError("")}
							></input>
							<p className='text-rouge text-xs'>{dateNaissanceError}</p>
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
								onFocus={() => setNationaliteError("")}
							></input>
							<p className='text-rouge text-xs'>{nationaliteError}</p>
						</div>
						<div className='flex flex-col'>
							<label className='text-violet text-xs font-bold'>
								Ville <span className='text-rouge'>*</span>
							</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='text'
								onChange={(e) => handleInputChange(e, "ville")}
								onFocus={() => setVilleError("")}
							></input>
							<p className='text-rouge text-xs'>{villeError}</p>
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
							onClick={() => handleClick()}
						></ButtonRond>
					</div>
				</div>
			)}

			{loading && <Spinner />}

			{showConfirmation && (
				<InscriptionConfirmation
					data={formData.email}
					onConfirm={handleSubmit}
				/>
			)}
		</div>
	);
}
