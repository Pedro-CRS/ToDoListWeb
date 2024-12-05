import { React, useState } from "react";
import { HexColorPicker } from "react-colorful";
import stlModal from "../Styles/Modal.module.css";

const ReactFulColorPicker = ({ color, onChange }) => {
	return (
		<div className={stlModal.smallColorPicker}>
			<label>Cor associada à categoria</label>
			<HexColorPicker color={color} onChange={onChange} />
		</div>
	);
};

export default ReactFulColorPicker;