import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import { Modal } from "./Modal";
import esi from "../assets/logo_esi.png";
import { axiosInstance } from "../util/axios";

export function CadreG({ id }) {
	// let offre = {
	// 	employeur: "KPMG",
	// 	"Date de publication": "12 Décembre, 20:20",
	// 	titre: "Jardinier",
	// 	Localisation: "Alger",
	// 	Salaire: "10$/heure",
	// 	Duree: "2 semaines",
	// 	Description:
	// 		"Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.",
	// };
	const [offre, setOffre] = useState({});

	async function getOffre() {
		try {
			const response = await axiosInstance.get(`/offres/${id}`);
			if (response.status === 200) {
				setOffre(response.data);
				console.log(offre);
			} else {
				console.log(response);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getOffre();
	}, [id]);

	const redirect = () => {
		window.location.href = `/offres/${id}/postuler`;
	};

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
		<div className='w-full bg-violet rounded-lg'>
			<div className='flex px-10 py-2'>
				<div>
					<p className='text-bleuF font-bold text-xl'>{offre.titre}</p>
					<div className='flex'>
						<p className='text-bleuF'>
							{offre.employeur ? offre.employeur.entreprise : ""}
						</p>
						<p className='text-bleuF ml-4'>{offre.date}</p>
						<p className='text-bleuF ml-4'>{offre.Localisation}</p>
						<p className='text-bleuF ml-4'>
							{offre.candidatures ? offre.candidatures.length : ""} condidats
						</p>
					</div>
				</div>
				<div className='ml-auto my-auto'>
					<Modal />
				</div>
			</div>
			<div>
				<img
					className=' bg-white w-full h-48'
					src={offre.image ? url + offre.image : esi}
				></img>
			</div>

			<div className='px-10 py-2'>
				<p className='text-bleuF font-bold text-lg'>A propos de l'offre</p>
				<div className='mt-2'>
					<p className='text-bleuF font-bold'>Description</p>
					<p className='text-sm text-bleuF'>{offre.description} </p>
				</div>
				<div className='mt-2'>
					<p className='text-bleuF font-bold'>Conditions</p>
					<ul className='list-disc text-bleuF'>
						<li>
							<p className='text-sm text-bleuF'>+5 ans d’éxpérience</p>
						</li>
						<li>
							<p className='text-sm text-bleuF'>De métier jardinier</p>
						</li>
						<li>
							<p className='text-sm text-bleuF'>Excellent en communication</p>
						</li>
						<li>
							<p className='text-sm text-bleuF'>
								A l’habitude de travailler sur de grands espaces
							</p>
						</li>
					</ul>
				</div>
				<div className='mt-2'>
					<p className='text-bleuF font-bold'>Notes importantes</p>
					<ul className='list-disc text-bleuF'>
						<li>
							<p className='text-sm text-bleuF'>
								On accepte seulement les condidats originaires d’Alger
							</p>
						</li>
						<li>
							<p className='text-sm text-bleuF'>Salaire attractif</p>
						</li>
					</ul>
				</div>
			</div>

			<div></div>
			<div className='flex justify-end m-4'>
				<ButtonRond
					couleur={"rouge"}
					couleurTexte={"violet"}
					contenu={"Condidater"}
					width={"fit"}
					height={"fit"}
					onClick={redirect}
				></ButtonRond>
			</div>
		</div>
	);
}
