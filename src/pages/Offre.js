import React from "react";
import { Header, CadreP, CadreG } from "../components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../util/axios";

export function Offre() {
	const [selectedOffer, setSelectedOffer] = useState(0);
	const [offres, setOffres] = useState([]);

	async function getOffres() {
		try {
			const response = await axiosInstance.get("/offres");

			console.log(response);

			if (response.request.status === 200) {
				setOffres(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getOffres();
	}, []);

	let { id } = useParams();
	const [selectedId, setSelectedId] = useState(id);

	const handleOfferSelection = (index, idOffre) => {
		setSelectedOffer(index);
		setSelectedId(idOffre);
	};
	const handleDeleteOffer = (e, index) => {
		const updatedOffres = [...offres];
		if (offres.length > 1) {
			updatedOffres.splice(index, 1);
		}
		setOffres(updatedOffres);
		if (index == updatedOffres.length) {
			handleOfferSelection(index - 1, updatedOffres[index - 1]._id);
		} else {
			handleOfferSelection(index, updatedOffres[index]._id);
		}
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<Header></Header>
			<div className='m-10 bg-white rounded-lg p-4'>
				<div className='flex'>
					<div className='w-2/5'>
						<div className='grid grid-cols-2 mr-6'>
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
						<div className='border border-bleuF rounded-lg h-96 mt-2 mr-6 p-2 overflow-y-scroll scrollbar-track-transparent'>
							{offres.map((item, index) => (
								<div className='mb-2'>
									<CadreP
										onClick={() => handleOfferSelection(index, item._id)}
										onDelete={(e) => handleDeleteOffer(e, index)}
										className={`${
											selectedOffer === index ? "border-2 border-bleuF" : ""
										}`}
										Offre={offres[index]}
									></CadreP>
								</div>
							))}
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

					<div className='w-3/5 flex justify-center items-center'>
						<CadreG id={selectedId}></CadreG>
					</div>
				</div>
			</div>
		</div>
	);
}
