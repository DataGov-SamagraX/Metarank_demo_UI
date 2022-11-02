import React from 'react';
import './AdditionalInfo.css';
import TableRow from './TableRow/TableRow';

function AdditionalInfo({rank,value,base_tag, tag_2, tag_3, crop, month, duration}) {
    return (
		<div className="ad-info-wrapper">
			<div className="ad-info-rank">
				<div>RANK</div>
				<div>{rank}</div>
			</div>
			<div className="ad-info-more">
				<TableRow name="value" value={value} />
				<TableRow name="base_tag" value={base_tag} />
				<TableRow name="tag_2" value={tag_2} />
				<TableRow name="tag_3" value={tag_3} />
				<TableRow name="crop" value={crop} />
				<TableRow name="month" value={month} />
				<TableRow name="duration" value={duration} />
			</div>
		</div>
	);
}

export default AdditionalInfo;