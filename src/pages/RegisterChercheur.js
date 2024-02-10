import React from "react";
import { Header, InscriptionChercheur } from "../components/users";

export function RegisterChercheur() {
	return (
		<div className='min-h-screen bg-bleu pb-20'>
			<Header></Header>
			<InscriptionChercheur></InscriptionChercheur>
		</div>
	);
}
