import React from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	CadreGEmployeur,
} from "../components";
import { useParams } from "react-router-dom";

export function OffreEmployeur() {
	let data = [{ Titre: "Jardinier", "Date de création": "13 Février 2024" }];
	let { id } = useParams();

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={0}></NavBarEmployeur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>
						Mes offres {">"} Offre {id}
					</p>
				</div>
				<div className='mt-4'>
					<CadreGEmployeur></CadreGEmployeur>
				</div>
			</div>
		</div>
	);
}
