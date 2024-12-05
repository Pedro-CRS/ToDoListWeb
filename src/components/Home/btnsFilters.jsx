import { React, useState } from "react";
import stl from "../../Styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const HeaderBtnsActions = ({ setedFilter, setFilter }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeFilter, setActiveFilter] = useState(setedFilter);

	const handleClick = (filter) => {
		setFilter(filter);
		setActiveFilter(filter);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={`w-100 ${stl.filtersDiv}`}>
			<div className="w-100 text-end">
				<FontAwesomeIcon icon={faFilter} onClick={toggleDropdown} style={{ cursor: "pointer", height: "20px" }} />
			</div>

			{isOpen && (
				<div className={`w-100 ${stl.filterBox}`}>
					<div className={`${stl.filterSection}`}>
						<p>Mostrar tarefas:</p>
						<div className={stl.filtersBtnsDiv}>
							<input id="allFilterInput" className={stl.rdBtn} type="radio" name="filter" value="All"
								checked={activeFilter === "All"} onChange={() => handleClick("All")} />
							<label htmlFor="allFilterInput" >Todas</label>

							<input id="doneFilterInput" className={stl.rdBtn} type="radio" name="filter" value="Done"
								checked={activeFilter === "Done"} onChange={() => handleClick("Done")} />
							<label htmlFor="doneFilterInput">Completas</label>

							<input id="notDoneFilterInput" className={stl.rdBtn} type="radio" name="filter" value="Not-Done"
								checked={activeFilter === "Not-Done"} onChange={() => handleClick("Not-Done")} />
							<label htmlFor="notDoneFilterInput">Incompletas</label>
						</div>
					</div>

					{/* <div className={`${stl.orderSection}`} >
						<div className={`${stl.selectWrapper}`}>
							<label htmlFor="typeSelect">Ordernar por:</label>
							<select id="typeSelect">
								<option value="date">Data</option>
								<option value="id">ID</option>
								<option value="priority">Prioridade</option>
							</select>
						</div>

						<div className={`${stl.selectWrapper}`}>
							<label htmlFor="orderSelect">Ordem:</label>
							<select id="orderSelect">
								<option value="asc">Ascendente</option>
								<option value="desc">Descendente</option>
							</select>
						</div>
					</div> */}
				</div>
			)}
		</div>
	);
};

export default HeaderBtnsActions;