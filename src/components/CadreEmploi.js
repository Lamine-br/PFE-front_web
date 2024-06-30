import React, { useState, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import google from "../assets/google.png";
import esi from "../assets/logo_esi.png";
import { axiosInstance } from "../util/axios";

export function CadreEmploi({ Emploi, className, onClick }) {
	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/offres");
			if (response.status === 200) {
				console.log(response.data);
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getUrl();
	}, []);
	return (
		<div
			className={`bg-violet rounded-lg w-full ${className} cursor-pointer border border-bleuF`}
			onClick={onClick}
		>
			<div className='flex w-full px-4 py-2'>
				<img className='rounded-full w-12 h-12 bg-white' src={esi}></img>

				<div className='flex flex-col w-full pl-4'>
					<div className='flex justify-between'>
						<div>
							<p className='text-bleuF font-bold'>
								{Emploi.offre ? Emploi.offre.titre : ""}
							</p>
							<p className='text-bleuF'>
								{Emploi.offre ? Emploi.offre.debut : ""} au{" "}
								{Emploi.offre ? Emploi.offre.fin : ""}
							</p>
						</div>
					</div>
					<div className='flex items-center justify-between mt-2 mr-6'>
						<div className='flex items-center'>
							<MdLocationOn color='#465475' />
							<p className='text-bleuF'>Alger</p>
						</div>
						<div className='flex items-center'>
							<FaDollarSign color='#465475' />
							<p className='text-bleuF'>
								{Emploi.offre ? Emploi.offre.remuneration : ""}
							</p>
						</div>
						<div className='flex items-center'>
							<TiTime size={20} color='#465475' />
							<p className='text-bleuF ml-1'>
								{Emploi.offre ? Emploi.offre.debut : ""}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
