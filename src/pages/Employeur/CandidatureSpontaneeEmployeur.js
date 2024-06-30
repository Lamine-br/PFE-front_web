import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	CandidatureSpontaneeE,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";
import { FaPlus } from "react-icons/fa";
import { ButtonCarre } from "../../components";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

export function CandidatureSpontaneeEmployeur() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	async function getCandidatureSpontanee() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get(
				"/candidatures/employeur/spontanees/" + id,
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
		getCandidatureSpontanee();
	}, []);

	return (
		<div className='min-h-screen pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur selected={3}></NavBarEmployeur>
			<div className='m-6 bg-white rounded-lg p-4 shadow border'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-rouge mb-4'>
						Candidature Spontanée faite le{" "}
						{moment(data.createdAt).format("DD MMMM YYYY")}
					</p>
				</div>
				<CandidatureSpontaneeE candidature={data} />
			</div>

			{loading && <Spinner />}
		</div>
	);
}
