import React from "react";
import { useState } from "react";
import {
	Header,
	WelcomeDiv,
	BarreEmployeurs,
	Cadres,
	Connexion,
	Inscription,
	BarreRecherche,
	Spinner,
} from "../components";

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

	const [offres, setOffres] = useState(data);

	const getResults = (search) => {
		return [
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
	};

	const [connexionVisible, setConnexionVisible] = useState(false);
	const [inscriptionVisible, setInscriptionVisible] = useState(false);

	const [searchOn, setSearchOn] = useState(false);
	const [showLoading, setShowLoading] = useState(false);

	const [search, setSearch] = useState("");

	const handleSearch = (search) => {
		setShowLoading(true);
		setTimeout(() => {
			setOffres(getResults(search));
			setSearch(search);
			setSearchOn(true);
			setShowLoading(false);
		}, 1000);
	};

	const handleAdvancedSearch = () => {
		setShowLoading(true);
		setTimeout(() => {
			setOffres(getResults("Votre recherche"));
			setSearch("Votre recherche avancée");
			setSearchOn(true);
			setShowLoading(false);
		}, 1000);
	};

	const handleConnexionToggle = () => {
		setConnexionVisible(!connexionVisible);
	};

	const handleInscriptionToggle = () => {
		setInscriptionVisible(!inscriptionVisible);
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 ${
					connexionVisible || inscriptionVisible ? "block" : "hidden"
				}`}
			/>
			<Header
				onConnexionToggle={handleConnexionToggle}
				onInscriptionToggle={handleInscriptionToggle}
			/>
			<BarreRecherche
				onSuggestionClick={handleSearch}
				onAdvancedSearchClick={handleAdvancedSearch}
			></BarreRecherche>

			{!searchOn && (
				<>
					<WelcomeDiv></WelcomeDiv>
					<Cadres search={search} data={offres}></Cadres>
					<BarreEmployeurs></BarreEmployeurs>
				</>
			)}

			{searchOn && <Cadres search={search} data={offres}></Cadres>}
			{showLoading && <Spinner />}

			{connexionVisible && <Connexion onClose={handleConnexionToggle} />}
			{inscriptionVisible && <Inscription onClose={handleInscriptionToggle} />}
		</div>
	);
}
