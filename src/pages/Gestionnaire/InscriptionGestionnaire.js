import React from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	CadreGEmployeur,
	CadreInscription,
} from "../../components";
import { useParams } from "react-router-dom";

export function InscriptionGestionnaire() {
	let data = [{ Titre: "Jardinier", "Date de création": "13 Février 2024" }];
	let { id } = useParams();

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={0}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>
						Inscriptions {">"} Inscription {id}
					</p>
				</div>
				<div className='mt-4'>
					<CadreInscription></CadreInscription>
				</div>
			</div>
		</div>
	);
}
