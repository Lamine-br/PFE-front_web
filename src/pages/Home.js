import React from "react";
import { useState } from "react";
import {
	Header,
	WelcomeDiv,
	BarreEmployeurs,
	Cadres,
	Connexion,
	Inscription,
} from "../components/users";

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
		<div className='min-h-screen bg-bleu'>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 ${
					connexionVisible || inscriptionVisible ? "block" : "hidden"
				}`}
			/>
			<Header
				onConnexionToggle={handleConnexionToggle}
				onInscriptionToggle={handleInscriptionToggle}
			/>
			<WelcomeDiv></WelcomeDiv>
			<BarreEmployeurs></BarreEmployeurs>
			<Cadres></Cadres>
			{connexionVisible && <Connexion onClose={handleConnexionToggle} />}
			{inscriptionVisible && <Inscription onClose={handleInscriptionToggle} />}
		</div>
	);
}
