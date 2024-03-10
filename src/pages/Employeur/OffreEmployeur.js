import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	CadreGEmployeur,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function OffreEmployeur() {
	const [data, setData] = useState(null);

	let { id } = useParams();

	async function getDetails() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/employeur/offres/" + id, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getDetails();
		console.log(data);
	}, []);

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
