import React from "react";
import { useState } from "react";
import {
	Header,
	WelcomeDiv,
	BarreEmployeurs,
	Cadres,
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

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<Header />
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
		</div>
	);
}
