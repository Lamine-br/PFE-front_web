import React, { useState, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { FaShareSquare, FaUserPlus } from "react-icons/fa";
import { axiosInstance } from "../util/axios";
import { CadrePartage } from "./CadrePartage";

export function PartagerOffre({ offre, onConfirm, onDismiss }) {
	const [loading, setLoading] = useState(false);
	const [groupes, setGroupes] = useState([]);
	const [selectedGroupe, setSelectedGroupe] = useState({});

	const [url, setUrl] = useState("");

	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/auth");
			if (response.status === 200) {
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function getGroupes() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/users/chercheur/groupes", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setGroupes(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getGroupes();
		getUrl();
	}, []);

	const handleConfirm = async () => {
		try {
			setLoading(true);

			await onConfirm(selectedGroupe._id, offre._id);
			onDismiss();
		} catch (error) {
			console.error("Confirmation error:", error);
			setLoading(false);
		}
	};

	return (
		<div className='fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			{!loading && (
				<div className=' w-1/3 h-fit bg-white p-4 rounded-md space-y-8'>
					<div className='space-y-4'>
						<div className='flex items-center justify-center space-x-2'>
							<p className='text-lg font-bold text-bleuF text-center'>
								Partager une offre
							</p>
							<FaShareSquare size={30} className='text-bleuF' />
						</div>
						<div>
							<CadrePartage Offre={offre} />
						</div>
						<div className='flex flex-col'>
							<label className='text-bleuF text-xs font-bold'>Groupe</label>
							<select
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								onChange={(e) => {
									const selectedGroupId = e.target.value;
									const selectedGroup = groupes.find(
										(group) => group._id === selectedGroupId
									);
									setSelectedGroupe(selectedGroup);
								}}
							>
								<option value=''>Sélectionnez un groupe</option>
								{groupes.map((item, index) => (
									<option key={item._id} value={item._id}>
										{item.nom}
									</option>
								))}
							</select>
						</div>
						<div className='flex justify-between bg-bleu p-4 rounded-lg'>
							<div>
								<p className='text-sm text-bleuF font-bold'>
									Groupe {selectedGroupe.nom}
								</p>
								<p className='text-sm text-bleuF font-semibold'>
									{selectedGroupe.description}
								</p>
								<div className='flex gap-[5px] mt-2'>
									{selectedGroupe.membres
										? selectedGroupe.membres.map((item, index) => (
												<img
													key={index}
													src={url + item.image}
													alt={item.altText}
													className='w-10 h-10 rounded-full -mr-3'
												/>
										  ))
										: ""}
								</div>
							</div>
						</div>
					</div>
					<div className='flex justify-end space-x-2'>
						<ButtonCarre
							couleur={"bleuF"}
							couleurTexte={"violet"}
							contenu={"Annuler"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={onDismiss}
						></ButtonCarre>
						<ButtonCarre
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Partager"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={handleConfirm}
						></ButtonCarre>
					</div>
				</div>
			)}
			{loading && <Spinner />}
		</div>
	);
}
