import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	CadreEmploi,
	Spinner,
} from "../../components";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";
import { ButtonCarre } from "../../components";

export function EmploiChercheur() {
	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);

	const { id } = useParams();

	async function getEmploi() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/emplois/chercheur/" + id, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				if (response.data.length === 0) {
					setVide(true);
				}
				setData(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	useEffect(() => {
		getEmploi();
		console.log(data);
	}, []);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur selected={1}></NavBarChercheur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex flex-col w-1/2'>
					<div className='flex items-center space-x-6'>
						<p className='text-xl font-bold text-bleuF'>Emploi</p>
						<div className='flex-grow'>
							<CadreEmploi Emploi={data} className={""} />
						</div>
					</div>
					<div className='flex items-center space-x-2 mt-10'>
						<p className='text-bleuF'>Ajouter une alerte</p>
						<button className='flex justify-center items-center bg-bleuF text-violet p-1 rounded-full'>
							<FaPlus size={15} />
						</button>
					</div>

					<div className='flex items-center justify-between space-x-2 mt-10'>
						<p className='text-bleuF'>Imprimer une attestation de travail</p>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Demander"}
							width={"w-32 text-xs"}
							height={"fit"}
							onclick={() => {}}
						></ButtonCarre>
					</div>
					<div className='flex items-center justify-between space-x-2 mt-4'>
						<p className='text-bleuF'>Faire une condidature spontanée</p>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Candidater"}
							width={"w-32 text-xs"}
							height={"fit"}
							onclick={() => {}}
						></ButtonCarre>
					</div>
				</div>
			</div>
			{loading && <Spinner />}
		</div>
	);
}
