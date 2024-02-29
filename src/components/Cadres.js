import React from "react";
import { Cadre } from "./Cadre";

export function Cadres({ search, data }) {
	return (
		<div className='my-20 ml-20'>
			<p className='text-xl text-bleuF font-bold mb-6'>
				Découvrez les offres d’intérim {search ? `associées à "${search}"` : ""}
			</p>
			<div className='container grid grid-cols-3 gap-8'>
				{data.map((item, index) => (
					<Cadre key={index} Offre={item} />
				))}
			</div>
		</div>
	);
}
