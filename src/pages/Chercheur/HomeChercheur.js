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

	const [searchOn, setSearchOn] = useState(false);
	const [loading, setLoading] = useState(false);

	const [search, setSearch] = useState("");

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

	const handleSearch = (search, metier, lieu) => {
		setLoading(true);
		getResults(search, metier, lieu);
		console.log(offres);
		setSearch(search);
		setSearchOn(true);
	};

	const handleAdvancedSearch = () => {
		setLoading(true);
		setTimeout(() => {
			setOffres(getResults("Votre recherche"));
			setSearch("Votre recherche avancée");
			setSearchOn(true);
			setLoading(false);
		}, 1000);
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur></NavBarChercheur>
			<BarreRecherche
				onSearch={(search, metier, lieu) => handleSearch(search, metier, lieu)}
			></BarreRecherche>
			<Cadres search={search} data={offres}></Cadres>
			{loading && <Spinner />}
		</div>
	);
}
