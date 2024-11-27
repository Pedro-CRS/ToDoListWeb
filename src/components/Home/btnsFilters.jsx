import { React, useState } from "react";
import stl from "../../Styles/Home.module.css";

const HeaderBtnsActions = ({ setedFilter, setFilter }) => {
	const [activeFilter, setActiveFilter] = useState(setedFilter);

	const handleClick = (filter) => {
		setFilter(filter);
		setActiveFilter(filter);
	};

	return (
		<div className={stl.filterButtons}>
			<button className={`${stl.filterBtn} ${activeFilter === "All" ? stl.active : ""}`} onClick={() => handleClick("All")}>
				Todas
			</button>

			<button className={`${stl.filterBtn} ${activeFilter === "Done" ? stl.active : ""}`} onClick={() => handleClick("Done")}>
				Completas
			</button>

			<button className={`${stl.filterBtn} ${activeFilter === "Not-Done" ? stl.active : ""}`} onClick={() => handleClick("Not-Done")}>
				Incompletas
			</button>
		</div>
	);
};

export default HeaderBtnsActions;
