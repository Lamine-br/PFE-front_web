import React from "react";
import { useState, useEffect } from "react";
import {
	Header,
	WelcomeDiv,
	BarreEmployeurs,
	Cadres,
	BarreRecherche,
	Spinner,
} from "../components";
import { axiosInstance } from "../util/axios";

export function Home() {
	let data = [
		{
			employeur: "ESI",
			"Date de publication": "12 Décembre, 20:20",
			titre: "Jardinier",
			Localisation: "Alger",
			Salaire: "10$/heure",
			Duree: "2 semaines",
			Description:
				"Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.",
		},
		{
			employeur: "ESI",
			"Date de publication": "12 Décembre, 20:20",
			titre: "Jardinier",
			Localisation: "Alger",
			Salaire: "10$/heure",
			Duree: "2 semaines",
			Description:
				"Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.",
		},
	];

	async function getOffres() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres");

			console.log(response);

			if (response.request.status === 200) {
				setOffres(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		getOffres();
	}, []);

	const [offres, setOffres] = useState(data);

	async function getResults(search, metier, lieu) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres/search", {
				params: {
					search: search ? search : undefined,
					lieu: lieu ? lieu : undefined,
					metier: metier ? metier : undefined,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setOffres(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function advancedSearch(
		date_debut,
		date_fin,
		salaire_min,
		salaire_max,
		entreprise,
		lieu,
		metier
	) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres/advancedSearch", {
				params: {
					date_debut: date_debut ? date_debut : undefined,
					date_fin: date_fin ? date_fin : undefined,
					salaire_min: salaire_min ? salaire_min : undefined,
					salaire_max: salaire_max ? salaire_max : undefined,
					entreprise: entreprise ? entreprise : undefined,
					lieu: lieu ? lieu : undefined,
					metier: metier ? metier : undefined,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setOffres(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const [searchOn, setSearchOn] = useState(false);
	const [loading, setLoading] = useState(false);

	const [search, setSearch] = useState("");

	const handleSearch = async (search, metier, lieu) => {
		setLoading(true);
		await getResults(search, metier, lieu);
		setSearch(search);
		setSearchOn(true);
		setLoading(false);
	};

	const handleAdvancedSearch = (
		date_debut,
		date_fin,
		salaire_min,
		salaire_max,
		entreprise,
		lieu,
		metier
	) => {
		advancedSearch(
			date_debut,
			date_fin,
			salaire_min,
			salaire_max,
			entreprise,
			lieu,
			metier
		);
		setSearchOn(true);
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<Header />
			<BarreRecherche
				onSearch={handleSearch}
				onAdvancedSearch={handleAdvancedSearch}
			></BarreRecherche>

			{!searchOn && (
				<>
					<WelcomeDiv></WelcomeDiv>
					<Cadres search={search} data={offres}></Cadres>
					<BarreEmployeurs></BarreEmployeurs>
				</>
			)}

			{searchOn && <Cadres search={search} data={offres}></Cadres>}
			{loading && <Spinner />}
		</div>
	);
}
