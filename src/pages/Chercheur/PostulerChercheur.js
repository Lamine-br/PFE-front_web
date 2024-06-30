import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	Spinner,
	Apply,
	Avertissement,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function PostulerChercheur() {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const [candidatures, setCandidatures] = useState([]);
	const [offres, setOffres] = useState([]);
	const [showAvertissement, setShowAvertissement] = useState(false);

	let { id } = useParams();

	async function getCandidatures() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/candidatures/chercheur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setCandidatures(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getOffre(lieu) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres", {
				params: {
					lieu: lieu ? lieu : undefined,
				},
			});
			console.log(response);

			if (response.status === 200) {
				setOffres(response.data);
				const offre = response.data.find((offre) => offre._id === id);
				setData(offre || {});
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function addCandidature(data) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/candidatures/chercheur/add",
				data,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 201) {
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const redirect = () => {
		window.location.href = "/offres/" + id;
	};

	useEffect(() => {
		getCandidatures();
		getOffre();
	}, []);

	useEffect(() => {
		setShowAvertissement(candidatures.length > 0);
	}, [candidatures]);

	return (
		<div className='min-h-screen pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur></NavBarChercheur>
			<div className='mx-6 my-4 bg-white rounded-lg shadow border '>
				<Apply offre={data} data={candidatures} onConfirm={addCandidature} />
			</div>
			{loading && <Spinner />}
			{showAvertissement && (
				<Avertissement
					Titre={"Avertissement"}
					Texte={`Vous postulez pour ${candidatures.length} offre${
						candidatures.length > 1 ? "s" : ""
					} d'emploi déja. Voulez vous continuer ?`}
					onConfirm={() => setShowAvertissement(false)}
					onDismiss={() => redirect()}
				/>
			)}
		</div>
	);
}
