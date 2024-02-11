import React from "react";

export function CadreAbonnement({ abonnement, className, onClick }) {
	return (
		<div
			className={`w-full bg-violet rounded-lg flex flex-col p-4 cursor-pointer ${className}`}
			onClick={onClick}
		>
			<div className='bg-bleu w-full h-10 rounded'></div>
			<div className='w-full h-1/4 my-2'>
				<p className='text-bleu text-xs font-bold'>
					Abonnement {abonnement.type}
				</p>
				<p className='text-bleuF text-sm font-bold'>{abonnement.prix}</p>
			</div>
			<div className='flex-grow border-t border-bleu w-1/8'></div>

			<div className='flex items-center justify-between'>
				<div className='w-full'>
					<p className='text-bleu text-xs font-bold'>Nombre d’offres</p>
					<p className='text-bleuF text-sm font-bold'>{abonnement.offres}</p>
				</div>

				<div>
					<p className='text-bleu text-xs font-bold'>Partage</p>
					<p className='text-bleuF text-sm font-bold'>{abonnement.partage}</p>
				</div>
			</div>
		</div>
	);
}
