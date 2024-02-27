import React from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	CadreInscription,
} from "../../components";
import { useParams } from "react-router-dom";

export function InscriptionGestionnaire() {
	let data = [{ Titre: "Jardinier", "Date de création": "13 Février 2024" }];
	let { id } = useParams();

	const handleClick = () => {
		window.location.href = `/gestionnaire/inscriptions`;
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={0}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex'>
					<p
						className='text-xl font-bold text-bleuF cursor-pointer'
						onClick={handleClick}
					>
						Inscriptions
					</p>
					<span className='ml-2'></span>
					<p className='text-xl font-bold text-bleuF'>
						{">"} Inscription {id}
					</p>
				</div>
				<div className='mt-4'>
					<CadreInscription></CadreInscription>
				</div>
			</div>
		</div>
	);
}
