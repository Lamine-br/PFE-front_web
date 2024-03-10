import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	CadreGEmployeur,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function OffreEmployeur() {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);

	let { id } = useParams();

	async function getDetails() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/employeur/offres/" + id, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
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
						Mes offres {">"} {data.titre}
					</p>
				</div>
				<div className='mt-4'>
					<CadreGEmployeur Offre={data}></CadreGEmployeur>
				</div>
			</div>
			{loading && <Spinner />}
		</div>
	);
}
