import React from "react";
import { Cadre } from "./Cadre";

export function Cadres() {
	return (
		<div className='my-20 ml-20'>
			<p className='text-xl text-bleuF font-bold mb-6'>
				Découvrez les offres d’intérim
			</p>
			<div className='container grid grid-cols-3 grid-rows-2 gap-8'>
				<Cadre></Cadre>
				<Cadre></Cadre>
				<Cadre></Cadre>
				<Cadre></Cadre>
				<Cadre></Cadre>
				<Cadre></Cadre>
			</div>
		</div>
	);
}
