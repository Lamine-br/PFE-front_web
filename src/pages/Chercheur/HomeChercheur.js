import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	BarreRecherche,
	Cadres,
	Spinner,
} from "../../components";
import { axiosInstance } from "../../util/axios";

export function HomeChercheur() {
	const [offres, setOffres] = useState([]);
	async function getOffres() {
		try {
			setShowLoading(true);
			const response = await axiosInstance.get("/offres");

			console.log(response);

			if (response.request.status === 200) {
				setOffres(response.data);
				setShowLoading(false);
			}
		} catch (e) {
			console.log(e);
			setShowLoading(false);
		}
	}
	useEffect(() => {
		getOffres();
	}, []);

	const [searchOn, setSearchOn] = useState(false);
	const [showLoading, setShowLoading] = useState(false);

	const [search, setSearch] = useState("");

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
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur></NavBarChercheur>
			<BarreRecherche
				onSearch={setOffres}
				onSuggestionClick={handleSearch}
				onAdvancedSearchClick={handleAdvancedSearch}
			></BarreRecherche>
			<Cadres search={search} data={offres}></Cadres>
			{showLoading && <Spinner />}
		</div>
	);
}
