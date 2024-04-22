import React, { useState, useEffect } from "react";
import { HeaderChercheur, Spinner, ProfileC } from "../../components";
import { axiosInstance } from "../../util/axios";
import { FaPlus, FaUserPlus } from "react-icons/fa";
import { NouveauGroupe } from "../../components";
import { AjouterUser } from "../../components/AjouterUser";

export function GroupesChercheur() {
	const [groupes, setGroupes] = useState([]);
	const [selectedGroupe, setSelectedGroupe] = useState({});
	const [loading, setLoading] = useState(false);
	const [showNouveauGroupe, setShowNouveauGroupe] = useState(false);

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

	async function addGroupe(nom, description) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/users/chercheur/addGroupe",
				{
					nom,
					description,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 201) {
				getGroupes();
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getGroupes();
		getUrl();
	}, []);

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

	const [showAddUser, setShowAddUser] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));

	async function addUserToGroupe(id, email, numero) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/users/chercheur/addUserToGroupe",
				{
					id,
					email,
					numero,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				getGroupes();
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className='min-h-screen pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<div className='mx-10 my-6'>
				<p className='text-xl font-bold text-rouge'>Groupes</p>
				<div className='grid grid-cols-3 mt-4 gap-2'>
					<div>
						<div className='relative border border-bleuF rounded-lg h-96 mt-2 mr-6 p-2 overflow-y-scroll scrollbar-track-transparent'>
							<div className='flex flex-col space-y-2'>
								{groupes.map((item) => (
									<div
										key={item._id}
										className={`flex flex-col justify-between bg-${
											selectedGroupe._id === item._id ? "bleu" : "violet"
										} p-2 rounded-lg border border-bleuF cursor-pointer`}
										onClick={() => setSelectedGroupe(item)}
									>
										<p className='text-sm text-bleuF font-bold'>
											Groupe {item.nom}
										</p>
										<p className='text-sm text-bleuF font-semibold'>
											{item.description}
										</p>
										<div className='flex gap-[5px] mt-2'>
											{item.membres.map((member, index) => (
												<img
													key={index}
													src={url + member.image}
													alt={member.altText}
													title={member.nom + " " + member.prenom}
													className='w-10 h-10 rounded-full -mr-3'
												/>
											))}
										</div>
									</div>
								))}
							</div>
							<button
								className='bg-bleuF w-12 h-12 absolute bottom-0 right-0 mb-6 justify-center items-center flex rounded-full'
								onClick={() => {
									setShowNouveauGroupe(true);
								}}
							>
								<FaPlus size={20} color='EEEDFF' />
							</button>
						</div>
					</div>
					<div className='col-span-2'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='border border-bleuF rounded-lg p-4'>
								<p className='text-sm text-bleuF font-bold'>
									Groupe {selectedGroupe.nom}
								</p>
								<p className='text-sm text-bleuF'>
									{selectedGroupe.description}
								</p>
							</div>
							<div className='border border-bleuF rounded-lg px-4 py-2'>
								<div className='flex items-center'>
									<p className='text-sm text-bleuF font-bold'>Membres</p>
									{user.email ===
									(selectedGroupe.createur
										? selectedGroupe.createur.email
										: "") ? (
										<FaUserPlus
											className=' cursor-pointer m-2'
											color='FF584D'
											size={20}
											onClick={(e) => {
												e.stopPropagation();
												setShowAddUser(true);
											}}
										/>
									) : (
										""
									)}
								</div>
								<div className='flex gap-[5px] mt-2'>
									{selectedGroupe.membres
										? selectedGroupe.membres.map((item, index) => (
												<img
													key={index}
													src={url + item.image}
													alt={item.altText}
													title={item.nom + " " + item.prenom}
													className='w-10 h-10 rounded-full -mr-3'
												/>
										  ))
										: ""}
								</div>
							</div>
						</div>

						<div className='border border-bleuF rounded-lg h-96 mt-2 p-2 overflow-y-scroll scrollbar-track-transparent'>
							<div className='flex flex-col space-y-2'></div>
						</div>
					</div>
				</div>
			</div>

			{showNouveauGroupe && (
				<NouveauGroupe
					onDismiss={() => setShowNouveauGroupe(false)}
					onConfirm={(nom, description) => addGroupe(nom, description)}
				/>
			)}

			{showAddUser && (
				<AjouterUser
					data={selectedGroupe}
					onConfirm={(email, numero) =>
						addUserToGroupe(selectedGroupe._id, email, numero)
					}
					onDismiss={() => setShowAddUser(false)}
				/>
			)}

			{loading && <Spinner />}
		</div>
	);
}
