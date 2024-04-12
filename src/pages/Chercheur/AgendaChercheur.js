import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	Agenda,
	Spinner,
} from "../../components";
import { axiosInstance } from "../../util/axios";

export function AgendaChercheur() {
	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(false);

	async function getEmplois() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/emplois/chercheur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				const agendaData = response.data.filter((item) => item.agenda === true);
				setData(agendaData);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const myEventsList = data.map((item) => {
		return {
			id: item._id,
			title: item.offre.titre,
			start: new Date(item.offre.debut),
			end: new Date(item.offre.fin),
		};
	});

	useEffect(() => {
		getEmplois();
	}, []);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur selected={2}></NavBarChercheur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className=''>
					<div className='w-full'>
						<Agenda data={myEventsList} />
					</div>
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
