import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	TableauCandidaturesSpontaneesEmployeur,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";
import { FaPlus } from "react-icons/fa";
import { ButtonCarre } from "../../components";

export function CandidaturesSpontaneesEmployeur() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getCandidaturesSpontanees() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get(
				"/candidatures/employeur/spontanees",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 200) {
				setData(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		getCandidaturesSpontanees();
	}, []);

	const handleClick = (id) => {
		window.location.href = `/employeur/candidaturesSpontanees/${id}`;
	};

	return (
		<div className='min-h-screen pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={3}></NavBarEmployeur>
			<div className='mx-6 mt-2 bg-white rounded-lg p-4 border shadow'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-rouge'>
						Candidatures Spontanées
					</p>
				</div>
				<div>
					<TableauCandidaturesSpontaneesEmployeur
						data={data}
						onRowClick={handleClick}
					></TableauCandidaturesSpontaneesEmployeur>
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
