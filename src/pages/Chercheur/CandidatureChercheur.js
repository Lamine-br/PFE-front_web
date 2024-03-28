import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	CandidatureC,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function CandidatureChercheur() {
	const [data, setData] = useState({});
	const [reponses, setReponses] = useState([]);
	const [loading, setLoading] = useState(false);

	let { id } = useParams();

	async function getDetails() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/chercheur/candidatures/" + id);

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				setLoading(false);
				console.log(data);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getReponses() {
		try {
			const response = await axiosInstance.get(
				`/chercheur/candidatures/${id}/reponses`
			);
			console.log(response);

			if (response.request.status === 200) {
				setReponses(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function deleteCandidature(id) {
		try {
			setLoading(true);
			const response = await axiosInstance.delete(
				"/chercheur/candidatures/" + id
			);

			if (response.request.status === 200) {
				setLoading(false);
				window.location.href = "/chercheur/candidatures";
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function updateCandidature(id, cv, motivation, commentaire) {
		try {
			setLoading(true);
			const response = await axiosInstance.put(
				"/chercheur/candidatures/" + id,
				{
					cv,
					motivation,
					commentaire,
				}
			);

			if (response.request.status === 200) {
				setLoading(false);
				getDetails();
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function contact(id, titre, contenu) {
		try {
			const response = await axiosInstance.post(
				`/chercheur/candidatures/${id}/contact`,
				{
					titre,
					contenu,
				}
			);

			if (response.request.status === 201) {
				console.log(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getDetails();
		console.log(data);
		getReponses();
	}, []);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur selected={0}></NavBarChercheur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>
						Candidatures {">"} {data.offre ? data.offre.titre : ""} (
						{data.status})
					</p>
				</div>
				<div className='mt-4'>
					<CandidatureC
						candidature={data}
						onDelete={deleteCandidature}
						onContact={contact}
						onUpdate={updateCandidature}
					/>
				</div>
				<div className='space-y-2 mt-2'>
					<p className='text-bleuF font-bold text-xl'>Conversation</p>
					{reponses.map((item, index) => (
						<div className='flex flex-col space-y-1 border border-bleuF rounded-lg p-2'>
							<div className='flex justify-between'>
								<p className='text-bleuF font-semibold'>{item.titre}</p>
								<p className='text-bleuF'>
									{item.createdAt.split("T")[0]} |{" "}
									{item.createdAt.split("T")[1].split(".")[0]}
								</p>
							</div>
							<p className='text-sm text-bleuF'>{item.contenu}</p>
						</div>
					))}
				</div>
			</div>
			{loading && <Spinner />}
		</div>
	);
}
