import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	Spinner,
	Apply,
	Popup,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function PostulerChercheur() {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const [candidatures, setCandidatures] = useState([]);
	const [showPopup, setShowPopup] = useState(false);

	let { id } = useParams();

	async function getCandidatures() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/chercheur/candidatures", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				const dataEnAttente = response.data.filter(
					(item) => item.status === "En attente"
				);
				setCandidatures(dataEnAttente);
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
	}, []);

	useEffect(() => {
		setShowPopup(candidatures.length > 0);
	}, [candidatures]);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur></NavBarChercheur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<Apply data={data} />
			</div>
			{loading && <Spinner />}
			{showPopup && (
				<Popup
					Titre={"Avertissement"}
					Texte={`Vous postulez pour ${candidatures.length} offre${
						candidatures.length > 1 ? "s" : ""
					} d'emploi déja. Voulez vous continuer ?`}
					onConfirm={() => setShowPopup(false)}
					onDismiss={() => redirect()}
				/>
			)}
		</div>
	);
}
