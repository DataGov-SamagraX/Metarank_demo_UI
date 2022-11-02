import React from 'react';
import './TableRow.css';

function TableRow({ name, value }) {
	return (
		<div className="TableRow-wrapper">
			<div>{name}: </div>
			<div>
				<b>{value}</b>
			</div>
		</div>
	);
}

export default TableRow;
