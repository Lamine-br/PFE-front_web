import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaMicrophone, FaCog } from "react-icons/fa";
import { Carousel } from "./Carousel";
import { VoiceRecognition } from "./VoiceRecognition";
import { RechercheAvancee } from "./RechercheAvancee";
import { axiosInstance } from "../util/axios";
import { Spinner } from "./Spinner";

export function BarreRecherche({
	onSearch,
	onSuggestionClick,
	onAdvancedSearchClick,
}) {
	const [loading, setLoading] = useState(false);

	const suggestionsRef = useRef(null);

	const lieuRef = useRef(null);
	const metierRef = useRef(null);
	const searchRef = useRef(null);

	const handleSearchIconClick = () => {
		setShowLieux(false);
		setShowSuggestions(false);
		setShowMetiers(false);
		getResults(
			searchRef.current.value,
			metierRef.current.value,
			lieuRef.current.value
		);
	};

	const handleAdvancedSearch = () => {
		onAdvancedSearchClick();
		setShowRechercheAvancee(false);
	};

	const [showSuggestions, setShowSuggestions] = useState(false);
	const suggestions = ["Développeur", "Jardinier", "Peintre"];
	const [filteredSuggestions, setFilteredSuggestions] = useState([
		"Développeur",
		"Jardinier",
		"Peintre",
	]);

	const [showMetiers, setShowMetiers] = useState(false);
	const [metiers, setMetiers] = useState([
		"Développeur",
		"Jardinier",
		"Peintre",
	]);
	const [filtredMetiers, setFilteredMetiers] = useState([
		"Développeur",
		"Jardinier",
		"Peintre",
	]);

	async function getMetiers() {
		try {
			const response = await axiosInstance.get("/offres/metiers");

			console.log(response);

			if (response.request.status === 200) {
				const metiers = response.data.map((item) => item.nom);
				setMetiers(metiers);
				setFilteredMetiers(metiers);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleInputMetierChange = (e) => {
		const searchTerm = e.target.value.toLowerCase();
		const filteredMetiers = metiers.filter((metier) =>
			metier.toLowerCase().includes(searchTerm)
		);
		setFilteredMetiers(filteredMetiers);
	};

	const handleInputLieuChange = (e) => {
		const searchTerm = e.target.value.toLowerCase();
		const filteredLieux = lieux.filter((lieu) =>
			lieu.toLowerCase().includes(searchTerm)
		);
		setFilteredLieux(filteredLieux);
	};

	const [showLieux, setShowLieux] = useState(false);
	const [lieux, setLieux] = useState(["Alger", "Bejaia", "Montpellier"]);
	const [filteredLieux, setFilteredLieux] = useState([
		"Alger",
		"Bejaia",
		"Montpellier",
	]);

	const [showVocal, setShowVocal] = useState(false);
	const [showRechercheAvancee, setShowRechercheAvancee] = useState(false);

	const handleInputSearchChange = (e) => {
		const searchTerm = e.target.value.toLowerCase();
		const filteredSuggestions = suggestions.filter((suggestion) =>
			suggestion.toLowerCase().includes(searchTerm)
		);
		setFilteredSuggestions(filteredSuggestions);
	};

	const carouselItems = [
		"Développeur Web",
		"Assistant Administratif",
		"Technicien de Maintenance",
		"Agent de Sécurité",
		"Infirmier Intérimaire",
		"Magasinier",
		"Serveur/Serveuse en Intérim",
	];

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target) &&
				!metierRef.current.contains(event.target) &&
				!lieuRef.current.contains(event.target)
			) {
				setShowSuggestions(false);
				setShowMetiers(false);
				setShowLieux(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		getMetiers();
	}, []);

	async function getResults(search, metier, lieu) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres/search", {
				params: {
					search: search ? search : undefined,
					lieu: lieu ? lieu : undefined,
					metier: metier ? metier : undefined,
				},
			});

			console.log(response);

			if (response.status === 200) {
				onSearch(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	return (
		<div>
			<div className='mt-20 mb-10 flex items-center justify-center w-full'>
				<div className={`relative flex bg-white items-center rounded-full`}>
					<button
						className={`bg-violet h-10 rounded-l-full`}
						onClick={handleSearchIconClick}
						title={"Recherche textuelle"}
					>
						<FaSearch className={`text-bleuF ml-4 mr-4 cursor-pointer`} />
					</button>

					<div className='w-1/2 relative'>
						<input
							ref={searchRef}
							placeholder='Rechercher ...'
							className={`p-2 bg-white rounded-lg outline-none pr-8`}
							onFocus={() => {
								setShowSuggestions(true);
								setShowLieux(false);
								setShowMetiers(false);
							}}
							onChange={handleInputSearchChange}
						/>

						{showSuggestions && (
							<div
								ref={suggestionsRef}
								className='absolute left-0 top-full w-full bg-white border border-gray-300 overflow-hidden shadow-md'
							>
								{filteredSuggestions.map((suggestion, index) => (
									<div
										key={index}
										className='p-2 cursor-pointer hover:bg-gray-100 transition'
										onClick={() => {
											setShowSuggestions(false);
											searchRef.current.value = suggestion;
										}}
									>
										{suggestion}
									</div>
								))}
							</div>
						)}
					</div>

					<div className='w-1/2 relative'>
						<input
							placeholder='Métier'
							ref={metierRef}
							className={`w-full p-2 border-l bg-white outline-none`}
							onFocus={() => {
								setShowMetiers(true);
								setShowLieux(false);
								setShowSuggestions(false);
							}}
							onChange={handleInputMetierChange}
						/>

						{showMetiers && (
							<div
								ref={suggestionsRef}
								className='absolute left-0 top-full w-full bg-white border border-gray-300 overflow-hidden shadow-md'
							>
								{filtredMetiers.slice(0, 3).map((metier, index) => (
									<div
										key={index}
										className='p-2 cursor-pointer hover:bg-gray-100 transition'
										onClick={() => {
											setShowMetiers(false);
											metierRef.current.value = metier;
										}}
									>
										{metier}
									</div>
								))}
							</div>
						)}
					</div>

					<div className='w-1/2 relative'>
						<input
							placeholder='Lieu'
							ref={lieuRef}
							className={`w-full p-2 border-l border-r bg-white outline-none`}
							onFocus={() => {
								setShowLieux(true);
								setShowMetiers(false);
								setShowSuggestions(false);
							}}
							onChange={handleInputLieuChange}
						/>

						{showLieux && (
							<div
								className='absolute left-0 top-full w-full bg-white border border-gray-300 overflow-hidden shadow-md'
								ref={suggestionsRef}
							>
								{filteredLieux.slice(0, 3).map((lieu, index) => (
									<div
										key={index}
										className='p-2 cursor-pointer hover:bg-gray-100 transition'
										onClick={() => {
											setShowLieux(false);
											lieuRef.current.value = lieu;
										}}
									>
										{lieu}
									</div>
								))}
							</div>
						)}
					</div>

					<button
						className={`bg-violet h-10`}
						onClick={() => setShowVocal(true)}
						title={"Recherche vocale"}
					>
						<FaMicrophone className='text-gray-500 mx-2 cursor-pointer' />
					</button>

					<button
						className={`bg-violet h-10 border-l rounded-r-full`}
						onClick={() => setShowRechercheAvancee(true)}
						title={"Recherche avancée"}
					>
						<FaCog className='text-gray-500 mx-2 mr-4 cursor-pointer'></FaCog>
					</button>
				</div>
			</div>
			<div className='flex justify-center'>
				<Carousel items={carouselItems} onClick={onSuggestionClick}></Carousel>
			</div>

			{showVocal && (
				<VoiceRecognition
					onClose={() => setShowVocal(false)}
					onConfirm={onSuggestionClick}
				/>
			)}

			{showRechercheAvancee && (
				<RechercheAvancee
					onClose={() => setShowRechercheAvancee(false)}
					onConfirm={handleAdvancedSearch}
				/>
			)}

			{loading && <Spinner />}
		</div>
	);
}
