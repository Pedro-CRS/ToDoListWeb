import { React, useState } from "react";

const HeaderBtnsActions = ({ setFilter }) => {
	const [activeFilter, setActiveFilter] = useState("All");

	const handleClick = (filter) => {
		setFilter(filter);
		setActiveFilter(filter);
	};

	return (
		<div className="filter-buttons">
			<button className={`filter-btn ${activeFilter === "All" ? "active" : ""}`} onClick={() => handleClick("All")}>
				Todas
			</button>

			<button className={`filter-btn ${activeFilter === "Done" ? "active" : ""}`} onClick={() => handleClick("Done")}>
				Completas
			</button>

			<button className={`filter-btn ${activeFilter === "Not-Done" ? "active" : ""}`} onClick={() => handleClick("Not-Done")}>
				Incompletas
			</button>
		</div>
	);
};

export default HeaderBtnsActions;
