import React, { useState, useRef, useEffect } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const Carousel = ({ items, onClick }) => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const carouselRef = useRef(null);

	const handleClick = (item, index) => {
		setSelectedItem(index);
		onClick(item);
	};

	const scrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
		}
	};

	const checkScrollPosition = () => {
		if (carouselRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
		}
	};

	useEffect(() => {
		if (carouselRef.current) {
			carouselRef.current.addEventListener("scroll", checkScrollPosition);
		}
		checkScrollPosition();
		return () => {
			if (carouselRef.current) {
				carouselRef.current.removeEventListener("scroll", checkScrollPosition);
			}
		};
	}, []);

	return (
		<div className='carousel-container'>
			{canScrollLeft && (
				<button className='carousel-button left' onClick={scrollLeft}>
					<ArrowLeftIcon
						style={{
							height: "70px",
							width: "40px",
							color: "#465475",
							mr: "20px",
						}}
					/>
				</button>
			)}
			<div className='carousel-content' ref={carouselRef}>
				{items.map((item, index) => (
					<p
						key={index}
						onClick={() => handleClick(item, index)}
						className={`carousel-item ${
							selectedItem === index
								? "bg-bleuF text-white"
								: "bg-violet text-bleuF"
						}`}
					>
						{item}
					</p>
				))}
			</div>
			{canScrollRight && (
				<button className='carousel-button right' onClick={scrollRight}>
					<ArrowRightIcon
						style={{ height: "80px", width: "35px", color: "#465475" }}
					/>
				</button>
			)}
		</div>
	);
};
