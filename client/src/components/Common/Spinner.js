import React from "react";
import spinnerImage from "./spinner.gif";

const spinner = () => {
	return (
		<div>
			<img
				src={spinnerImage}
				alt="Loading..."
				style={{
					width: "100px",
					margin: "auto",
					display: "block"
				}}
			/>
		</div>
	);
};

export default spinner;
