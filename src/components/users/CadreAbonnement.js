import React from "react";

export function CadreAbonnement({ abbonnement, className, onClick }) {
	return (
		<div
			className={`w-full bg-violet rounded-lg flex flex-col p-4 cursor-pointer ${className}`}
			onClick={onClick}
		>
			<div className='bg-bleu w-full h-20 rounded'></div>
			<div className='w-full h-1/4 my-2'>
				<p className='text-bleu text-xs font-bold'>
					Abonnement {abbonnement.type}
				</p>
				<p className='text-bleuF text-sm font-bold'>{abbonnement.prix}</p>
			</div>
			<div className='flex-grow border-t border-bleu w-1/8'></div>
			<div className='w-full h-1/4 my-2'>
				<p className='text-bleu text-xs font-bold'>Nombre d’offres</p>
				<p className='text-bleuF text-sm font-bold'>{abbonnement.offres}</p>
			</div>
			<div className='flex-grow border-t border-bleu w-1/8'></div>
			<div className='w-full h-1/4 mt-2'>
				<p className='text-bleu text-xs font-bold'>Partage</p>
				<p className='text-bleuF text-sm font-bold'>{abbonnement.partage}</p>
			</div>
		</div>
	);
}
