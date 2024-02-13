import React from "react";
import { Header, CadreP, CadreG } from "../components";
import { useState } from "react";

export function Offre() {
	const [selectedOffer, setSelectedOffer] = useState(0);

	const handleOfferSelection = (index) => {
		setSelectedOffer(index);
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<Header></Header>

			<div className='flex my-10'>
				<div className='w-2/5'>
					<div className='grid grid-cols-2 mx-10 mt-4'>
						<label className='flex items-center justify-start rounded-lg'>
							<input
								type='checkbox'
								name='options'
								className='h-4 w-4 text-blue-500 focus:ring-blue-200'
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								Même employeur
							</span>
						</label>
						<label className='flex items-center justify-start rounded-lg'>
							<input
								type='checkbox'
								name='options'
								className='h-4 w-4 text-blue-50 focus:ring-blue-200'
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								Même période
							</span>
						</label>

						<label className='flex items-center justify-start rounded-lg'>
							<input
								type='checkbox'
								name='options'
								className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								Même métier
							</span>
						</label>
						<label className='flex items-center justify-start rounded-lg'>
							<input
								type='checkbox'
								name='options'
								className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								Même lieu
							</span>
						</label>
					</div>
					<div className='border border-bleuF rounded-lg h-96 mt-2 mx-10 p-4 overflow-y-scroll scrollbar-track-transparent'>
						<div className='mb-2'>
							<CadreP
								onClick={() => handleOfferSelection(0)}
								className={`${
									selectedOffer === 0 ? "border-2 border-bleuF" : ""
								}`}
							></CadreP>
						</div>
						<div className='mb-2'>
							<CadreP
								onClick={() => handleOfferSelection(1)}
								className={`${
									selectedOffer === 1 ? "border-2 border-bleuF" : ""
								}`}
							></CadreP>
						</div>
						<div className='mb-2'>
							<CadreP
								onClick={() => handleOfferSelection(2)}
								className={`${
									selectedOffer === 2 ? "border-2 border-bleuF" : ""
								}`}
							></CadreP>
						</div>
						<div className='mb-2'>
							<CadreP
								onClick={() => handleOfferSelection(3)}
								className={`${
									selectedOffer === 3 ? "border-2 border-bleuF" : ""
								}`}
							></CadreP>
						</div>
						<div className='mb-2'>
							<CadreP
								onClick={() => handleOfferSelection(4)}
								className={`${
									selectedOffer === 4 ? "border-2 border-bleuF" : ""
								}`}
							></CadreP>
						</div>
						<div className='mb-2'>
							<CadreP
								onClick={() => handleOfferSelection(5)}
								className={`${
									selectedOffer === 5 ? "border-2 border-bleuF" : ""
								}`}
							></CadreP>
						</div>
					</div>

					<style jsx>{`
						/* Styles spécifiques à la barre de défilement */
						::-webkit-scrollbar {
							width: 8px; /* Largeur de la barre de défilement */
						}

						::-webkit-scrollbar-thumb {
							background-color: #465475; /* Couleur de la poignée */
							border-radius: 4px; /* Bord arrondi de la poignée */
						}

						::-webkit-scrollbar-track {
							background-color: transparent; /* Couleur de la piste (fond) */
						}
					`}</style>
				</div>

				<div className='w-3/5 flex justify-center items-center p-5'>
					<CadreG></CadreG>
				</div>
			</div>
		</div>
	);
}
