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
	TableauCategories,
} from "../../components";
import { axiosInstance } from "../../util/axios";
import { FaPlus } from "react-icons/fa";

export function OffresEmployeur() {
	let [selected, setSelected] = useState(0);
	console.log(selected);
	let [data, setData] = useState([]);
	let [categories, setCategories] = useState([]);
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

	async function getCategories() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/employeur/categories", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				setCategories(response.data);
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

	async function deleteCategorie(id) {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axiosInstance.delete(`/employeur/categories/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.status === 200) {
			console.log(response.data);
		}
	}

	async function deplacerOffre(idCategorie, idOffre) {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axiosInstance.post(
			`/employeur/categories/${idCategorie}`,
			{ id: idOffre },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (response.status === 200) {
			console.log(response.data);
		}
	}

	useEffect(() => {
		getOffres();
		getCategories();
	}, []);

	const handleClick = (id) => {
		window.location.href = `/employeur/offres/${id}`;
	};

	const handleCategorieClick = (id) => {
		setSelected(id);
	};

	const handleAddOffre = async () => {
		setLoading(true);
		await getOffres();
		setLoading(false);
		setShowNouvelleOffre(false);
	};

	const handleUpdateOffre = async () => {
		setLoading(true);
		await getOffres();
		setLoading(false);
		setShowModifyOffre(false);
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

	const handleAddCategorie = async () => {
		setLoading(true);
		await getCategories();
		setLoading(false);
		setShowNouvelleCategorie(false);
	};

	const handleDeleteCategorie = async (id) => {
		await deleteCategorie(id);
		setLoading(true);
		await getCategories();
		setLoading(false);
	};

	const handleMoveOffre = async (idCategorie, idOffre) => {
		await deplacerOffre(idCategorie, idOffre);
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
			<div className='grid grid-cols-4 mx-6 gap-6'>
				<div className='my-6 bg-white rounded-lg p-4'>
					<div className='flex justify-between'>
						<p className='text-xl font-bold text-bleuF'>Mes catégories</p>
						<div className='flex space-x-4'>
							<ButtonCarre
								couleur='bleuF'
								couleurTexte={"violet"}
								contenu={<FaPlus />}
								width={"fit text-sm"}
								height={"fit"}
								onclick={() => setShowNouvelleCategorie(true)}
							></ButtonCarre>
						</div>
					</div>
					<div>
						<TableauCategories
							data={categories}
							onRowClick={(id) => handleCategorieClick(id)}
							onDelete={handleDeleteCategorie}
							onModify={handleModifyOffre}
							vide={vide}
						></TableauCategories>
					</div>
				</div>
				<div className='my-6 bg-white rounded-lg p-4 col-span-3'>
					<div className='flex justify-between'>
						<p className='text-xl font-bold text-bleuF'>Mes offres</p>
						<div className='flex space-x-4'>
							<ButtonCarre
								couleur='rouge'
								couleurTexte={"violet"}
								contenu={<FaPlus />}
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
							onMove={handleMoveOffre}
							vide={vide}
							categorie={selected}
						></TableauOffres>
					</div>
				</div>
			</div>

			{showNouvelleOffre && (
				<NouvelleOffre
					onClose={() => setShowNouvelleOffre(false)}
					onConfirm={handleAddOffre}
				/>
			)}

			{showNouvelleCategorie && (
				<NouvelleCategorie
					titre={"Nouvelle Catégorie"}
					onDismiss={() => setShowNouvelleCategorie(false)}
					onConfirm={handleAddCategorie}
				/>
			)}

			{showModifyOffre && (
				<ModifierOffre
					id={idOffre}
					onClose={() => setShowModifyOffre(false)}
					onConfirm={handleUpdateOffre}
				/>
			)}

			{loading && <Spinner />}
		</div>
	);
}
