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
				All
			</button>

			<button className={`filter-btn ${activeFilter === "Done" ? "active" : ""}`} onClick={() => handleClick("Done")}>
				Done
			</button>

			<button className={`filter-btn ${activeFilter === "Not-Done" ? "active" : ""}`} onClick={() => handleClick("Not-Done")}>
				Not done
			</button>
		</div>
	);
};

export default HeaderBtnsActions;
