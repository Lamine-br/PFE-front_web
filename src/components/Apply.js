import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ButtonRond } from "./ButtonRond";
import { FaFileUpload, FaCheck } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { axiosInstance } from "../util/axios";

export function Apply({ data, onConfirm }) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [show1, setShow1] = useState(true);
	const [show2, setShow2] = useState(false);
	const [show3, setShow3] = useState(false);
	const [show4, setShow4] = useState(false);

	let { id } = useParams();
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

	const [candidature, setCandidature] = useState({
		cv: "",
		motivation: "",
		commentaire: "",
		offre: id,
	});

	async function getProfile() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/users/profile", {
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
		getUrl();
	}, []);

	function handleInputChange(event, field) {
		const value = event.target.value;
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: value,
		}));
	}

	const [folderName, setFolderName] = useState(
		"candidature_" + user.username.replace(/\s/g, "") + "_" + id
	);
	const [selectedCv, setSelectedCv] = useState(null);
	const [previewUrlCv, setPreviewUrlCv] = useState(null);
	const [uploadedCv, setUploadedCv] = useState(false);
	const [pdfObjectUrl, setPdfObjectUrl] = useState("");

	const handleCvChange = (event) => {
		const file = event.target.files[0];
		setSelectedCv(file);
		if (file) {
			setUploadedCv(false);
			const fileType = file.type.split("/")[1]; // Get the file extension

			if (fileType === "pdf") {
				setPdfObjectUrl(URL.createObjectURL(file)); // Set PDF URL for object element
				setPreviewUrlCv(null); // Reset image preview
			} else if (
				fileType === "jpeg" ||
				fileType === "jpg" ||
				fileType === "png"
			) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreviewUrlCv(reader.result); // Set image preview URL
				};
				reader.readAsDataURL(file);
				setPdfObjectUrl(null); // Reset PDF URL
			} else {
				console.log("Unsupported file format.");
			}
		} else {
			setPreviewUrlCv(null);
			setPdfObjectUrl(null);
		}
	};

	const handleCvUpload = async () => {
		if (selectedCv) {
			const data = new FormData();
			data.append("cv", selectedCv);

			try {
				const response = await axiosInstance.post(
					"/candidatures/upload/" + folderName,
					data,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
				if (response.status === 200) {
					setCandidature((prevCandidature) => ({
						...prevCandidature,
						cv: response.data,
					}));
					setUploadedCv(true);
					console.log(response.data);
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		} else {
			console.log("Please select a file.");
		}
	};

	const [selected, setSelected] = useState("");

	const handleCvSelect = (event) => {
		setSelected(event.target.value);
		console.log(url + selected);
	};

	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/candidatures");
			if (response.status === 200) {
				console.log(response.data);
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleClick = async () => {
		await onConfirm(candidature);
	};

	const redirectToProfile = () => {
		window.location.href = "/chercheur/profile";
	};

	return (
		<div className='overlay flex justify-center'>
			{show1 && (
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
							<label className='text-violet text-xs font-bold'>
								Nationalité
							</label>
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
					</div>

					<div className='flex justify-between mr-4'>
						<div className='flex space-x-2 ml-4'>
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
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Continuer"}
							width={"fit"}
							height={"fit"}
							onClick={() => {
								setShow2(true);
								setShow1(false);
							}}
						></ButtonRond>
					</div>
				</div>
			)}

			{show2 && (
				<div className='z-50 justify-center items-center p-4 w-full h-4/5 bg-bleuF rounded-lg'>
					<div className='grid grid-cols-4 gap-8 mx-4 mb-6'>
						<div className='flex flex-col'>
							<label className='text-violet text-xs font-bold'>
								Choisir ou saisir un CV :
							</label>
							<select
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								onChange={handleCvSelect}
							>
								<option value=''>Choisir un CV existant</option>
								{data.map((item, index) => (
									<option value={item.dossier.cv}>CV{index + 1}</option>
								))}
							</select>
						</div>
						<div className='flex w-full h-full'>
							<object
								data={url + selected}
								type='application/pdf'
								className='flex w-full h-44 bg-black'
							></object>
						</div>
						<div className='flex w-full h-full items-center space-x-4 justify-center relative'>
							<label
								htmlFor='cvInput'
								className='rounded bg-violet text-bleuF text-sm h-fit font-bold px-2 py-1 cursor-pointer'
							>
								Importer
							</label>

							<input
								id='cvInput'
								className='hidden'
								type='file'
								onChange={handleCvChange}
							/>

							<div className='flex w-full h-44'>
								{pdfObjectUrl ? (
									<object
										data={url + selected}
										type='application/pdf'
										width='100%'
									></object>
								) : (
									<img
										src={previewUrlCv}
										className={`flex w-full h-1/2 bg-black`}
									/>
								)}
							</div>
							{!uploadedCv && (pdfObjectUrl || previewUrlCv) && (
								<button
									className='rounded bg-violet text-bleuF text-sm font-bold px-2 py-2'
									onClick={() => handleCvUpload()}
								>
									<FaCheck color='465475' />
								</button>
							)}
							{uploadedCv && <FaCheck color='30CA3F' />}
						</div>
					</div>
					<div className='flex justify-end mr-4 space-x-2'>
						<ButtonRond
							couleur={"bleu"}
							couleurTexte={"violet"}
							contenu={"Retour"}
							width={"fit"}
							height={"fit"}
							onClick={() => {
								setShow1(true);
								setShow2(false);
							}}
						></ButtonRond>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Continuer"}
							width={"fit"}
							height={"fit"}
							onClick={() => {
								setShow2(true);
								setShow1(false);
							}}
						></ButtonRond>
					</div>
				</div>
			)}

			{show3 && (
				<div className='z-50 justify-center items-center p-4 w-full h-4/5 bg-bleuF rounded-lg'>
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
				</div>
			)}

			{show4 && (
				<div className='z-50 justify-center items-center p-4 w-full h-4/5 bg-bleuF rounded-lg'>
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
				</div>
			)}
		</div>
	);
}
