import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import './content.css';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';

import { make_interaction } from '../../../actions';

function Content({ id, rank, value, info }) {
	const dispatch = useDispatch();
	const [more, setMore] = useState(false);
	const [promote, setPromote] = useState(false);
	return (
		<div className="content-wrapper">
			<div className="content-show-more" onClick={() => setMore(!more)}>
				🧮
			</div>
			<div className="content-id">
				<p>{id}</p>
			</div>
			{promote && (
				<div className="content-hover">
					<p>⬆️</p>
					<p>Promote</p>
				</div>
			)}
			<div
				className="content-hover-maker"
				onClick={() => dispatch(make_interaction(id))}
				onMouseEnter={() => setPromote(true)}
				onMouseLeave={() => setPromote(false)}
			/>
			{more && <AdditionalInfo rank={rank} value={value} {...info} />}
		</div>
	);
}

export default Content;
