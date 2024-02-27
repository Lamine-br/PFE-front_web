import React from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	LineChart,
	ColumnChart,
} from "../../components";

export function StatistiquesGestionnaire() {
	let data = {
		Semaine: [10, 15, 20, 25],
		Mois: [10, 15, 20, 25, 10, 15, 20, 25, 10, 15, 20, 25],
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={2}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Statistiques</p>
				</div>
				<div className='grid grid-cols-5 my-6 space-x-4'>
					<div className='bg-bleuF rounded-lg p-4'>
						<p className='text-violet font-bold text-sm'>Nombre d’inscrits</p>
						<br></br>
						<p className='text-violet font-bold text-sm text-right'>1000</p>
					</div>
					<div className='bg-bleu rounded-lg p-4'>
						<p className='text-violet font-bold text-sm'>Agences</p>
						<br></br>
						<p className='text-violet font-bold text-sm text-right'>72</p>
					</div>
					<div className='bg-bleu rounded-lg p-4'>
						<p className='text-violet font-bold text-sm'>Employeurs</p>
						<br></br>
						<p className='text-violet font-bold text-sm text-right'>30</p>
					</div>
					<div className='bg-bleu rounded-lg p-4'>
						<p className='text-violet font-bold text-sm'>
							Chercheurs d'emplois
						</p>
						<br></br>
						<p className='text-violet font-bold text-sm text-right'>898</p>
					</div>
				</div>
				<div className='grid grid-cols-2 space-x-2'>
					<div>
						<p className='text-bleuF font-bold mb-2'>Nombre d'annonces</p>
						<LineChart title={"Nombre d’annonces"} data={data}></LineChart>
					</div>
					<div>
						<p className='text-bleuF font-bold mb-2'>Nombre de candidatures</p>
						<LineChart title={"Nombre de candidatures"} data={data}></LineChart>
					</div>
				</div>
				<div className='grid grid-cols-3 space-x-2'>
					<div>
						<p className='text-bleuF font-bold my-2'>
							Les métiers les plus demandés
						</p>
						<ColumnChart title={"Nombre d’annonces"} data={data}></ColumnChart>
					</div>
					<div>
						<p className='text-bleuF font-bold my-2'>
							Les métiers les plus proposés
						</p>
						<ColumnChart title={"Nombre d’annonces"} data={data}></ColumnChart>
					</div>
				</div>
				<div className='grid grid-cols-2 space-x-2'>
					<div>
						<p className='text-bleuF font-bold my-2'>Nombre de consultations</p>
						<LineChart title={"Nombre de candidatures"} data={data}></LineChart>
					</div>
				</div>
			</div>
		</div>
	);
}
