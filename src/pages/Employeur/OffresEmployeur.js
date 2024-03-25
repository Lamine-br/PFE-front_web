import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	TableauOffres,
	NouvelleOffre,
	ModifierOffre,
	NouvelleCategorie,
	Spinner,
} from "../../components";
import { axiosInstance } from "../../util/axios";

export function OffresEmployeur() {
	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);
	let [idOffre, setIdOffre] = useState(null);

	async function getOffres() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/employeur/offres", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				if (response.data.length === 0) {
					setVide(true);
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	async function deleteOffre(id) {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axiosInstance.delete(`/employeur/offres/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.request.status === 200) {
			console.log(response.data);
		}
	}

	useEffect(() => {
		getOffres();
	}, []);

	const handleClick = (id) => {
		window.location.href = `/employeur/offres/${id}`;
	};

	const handleAddOffre = async () => {
		setLoading(true);
		await getOffres();
		setLoading(false);
		setShowNouvelleOffre(false);
	};

	const handleModifyOffre = async (id) => {
		setShowModifyOffre(true);
		setIdOffre(id);
	};

	const handleDeleteOffre = async (id) => {
		await deleteOffre(id);
		setLoading(true);
		await getOffres();
		setLoading(false);
	};

	const [showNouvelleOffre, setShowNouvelleOffre] = useState(false);
	const [showModifyOffre, setShowModifyOffre] = useState(false);
	const [showNouvelleCategorie, setShowNouvelleCategorie] = useState(false);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={0}></NavBarEmployeur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Mes offres</p>
					<div className='flex space-x-4'>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Nouvelle offre"}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => setShowNouvelleOffre(true)}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<TableauOffres
						data={data}
						onRowClick={handleClick}
						onDelete={handleDeleteOffre}
						onModify={handleModifyOffre}
						vide={vide}
					></TableauOffres>
				</div>
			</div>

			{showNouvelleOffre && (
				<NouvelleOffre
					onClose={() => setShowNouvelleOffre(false)}
					onConfirm={handleAddOffre}
				/>
			)}

			{showModifyOffre && (
				<ModifierOffre id={idOffre} onClose={() => setShowModifyOffre(false)} />
			)}

			{loading && <Spinner />}
		</div>
	);
}
