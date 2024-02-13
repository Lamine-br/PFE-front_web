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
} from "../components";

export function Home() {
	const [connexionVisible, setConnexionVisible] = useState(false);
	const [inscriptionVisible, setInscriptionVisible] = useState(false);

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
			<BarreRecherche></BarreRecherche>
			<WelcomeDiv></WelcomeDiv>
			<Cadres></Cadres>
			<BarreEmployeurs></BarreEmployeurs>
			{connexionVisible && <Connexion onClose={handleConnexionToggle} />}
			{inscriptionVisible && <Inscription onClose={handleInscriptionToggle} />}
		</div>
	);
}
