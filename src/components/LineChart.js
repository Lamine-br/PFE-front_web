import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

/**
 * statistic chart
 * @component
 * @returns {React.ReactElement}
 */
export function LineChart({ title, data }) {
	const chartRef = useRef(null);

	const labels = {
		Semaine: ["Semaine1", "Semaine2", "Semaine3", "Semaine4"],
		Mois: [
			"Janvier",
			"Février",
			"Mars",
			"Avril",
			"Mai",
			"Juin",
			"Juillet",
			"Aout",
			"Septembre",
			"Octobre",
			"Novembre",
			"Décembre",
		],
	};

	const regions = ["Alger", "Oran", "Annaba", "Béjaia"];

	const metiers = ["Développeur", "Designer", "Administrateur BDD"];

	const dataUsed = {
		Semaine: data.Semaine,
		Mois: data.Mois,
	};

	const [selectedPeriod, setSelectedPeriod] = useState("Semaine");

	useEffect(() => {
		const options = {
			chart: {
				type: "line",
				background: "#EEEDFF",
				height: 200,
				width: "100%",
				stroke: {
					curve: "smooth",
				},
				toolbar: {
					show: false,
				},
			},
			series: [
				{
					name: "Annonces",
					data: dataUsed[selectedPeriod],
				},
			],
			xaxis: {
				categories: labels[selectedPeriod],
				labels: {
					style: {
						colors: "#465475",
					},
				},
			},
			yaxis: {
				labels: {
					style: {
						colors: "#465475",
					},
				},
			},
			grid: {
				borderColor: "#B6CDE8",
				borderOpacity: 0.2,
			},
			colors: ["#FF584D", "#FF0000"],
		};

		const chart = new ApexCharts(chartRef.current, options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, [selectedPeriod, data]);

	const handlePeriodChange = (e) => {
		setSelectedPeriod(e.target.value);
	};

	return (
		<div className='chart-container w-full rounded shadow pt-4 bg-violet'>
			<div className='flex flex-row justify-between px-4'>
				<div className='flex items-center'>
					<label className='font-semibold text-bleuF text-xs'>Par </label>
					<select
						className='appearance-none ml-2 border text-center text-xs text-bleuF border-bleuF rounded-md shadow-sm focus:border-success focus:outline-none px-2 py-1'
						value={selectedPeriod}
						onChange={handlePeriodChange}
					>
						{Object.keys(labels).map((key, index) => (
							<option key={index} value={key}>
								{key}
							</option>
						))}
					</select>
				</div>
				<div className='flex items-center'>
					<label className='font-semibold text-bleuF text-xs'>Région </label>
					<select
						className='appearance-none ml-2 border text-center text-xs text-bleuF border-bleuF rounded-md shadow-sm focus:border-success focus:outline-none px-2 py-1'
						value={() => {}}
						onChange={() => {}}
					>
						{regions.map((key, index) => (
							<option key={index} value={key}>
								{key}
							</option>
						))}
					</select>
				</div>
				<div className='flex items-center'>
					<label className='font-semibold text-bleuF text-xs'>Métier </label>
					<select
						className='appearance-none ml-2 border text-center text-bleuF text-xs border-bleuF rounded-md shadow-sm focus:border-success focus:outline-none px-2 py-1'
						value={() => {}}
						onChange={() => {}}
					>
						{metiers.map((key, index) => (
							<option key={index} value={key}>
								{key}
							</option>
						))}
					</select>
				</div>
			</div>
			<div ref={chartRef}></div>
		</div>
	);
}
