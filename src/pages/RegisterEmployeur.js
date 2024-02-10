import React from "react";
import {
	Header,
	InscriptionEmployeur,
	Abonnements,
	Paiement,
} from "../components/users";

export function RegisterEmployeur() {
	return (
		<div className='min-h-screen bg-bleu pb-20'>
			<Header></Header>
			<InscriptionEmployeur></InscriptionEmployeur>
			<Abonnements></Abonnements>
			<Paiement></Paiement>
		</div>
	);
}
