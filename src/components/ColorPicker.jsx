import { React, useState } from "react";
import { HexColorPicker } from "react-colorful";
import stl from "../Styles/ColorPicker.module.css";

const ReactFulColorPicker = ({ color, onChange }) => {
	return (
		<div className={stl.smallColorPicker}>
			<label>Cor associada à categoria</label>
			<HexColorPicker color={color} onChange={onChange} />
		</div>
	);
};

export default ReactFulColorPicker;