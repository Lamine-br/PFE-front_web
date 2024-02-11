import React from "react";
import { useState } from "react";
import {
	Header,
	InscriptionEmployeur,
	Abonnements,
	Paiement,
} from "../components/users";

export function RegisterEmployeur() {
	const [afficherInscription, setAfficherInscription] = useState(true);
	const [afficherAbonnements, setAfficherAbonnements] = useState(false);
	const [afficherPaiement, setAfficherPaiement] = useState(false);

	const passerAbonnement = () => {
		setAfficherInscription(false);
		setAfficherAbonnements(true);
	};

	const retourInscription = () => {
		setAfficherAbonnements(false);
		setAfficherInscription(true);
	};

	const passerPaiement = () => {
		setAfficherAbonnements(false);
		setAfficherPaiement(true);
	};

	const retourAbonnement = () => {
		setAfficherPaiement(false);
		setAfficherAbonnements(true);
	};

	return (
		<div className='min-h-screen bg-bleu p-5'>
			{afficherInscription && (
				<InscriptionEmployeur onPass={passerAbonnement}></InscriptionEmployeur>
			)}
			{afficherAbonnements && (
				<Abonnements onPass={passerPaiement}></Abonnements>
			)}
			{afficherPaiement && (
				<Paiement onPass={() => {}} onChange={retourAbonnement}></Paiement>
			)}
		</div>
	);
}
