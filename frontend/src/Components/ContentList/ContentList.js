import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

//import { ranking } from '../../Data/ranking_recieved';
import Content from './Content/content';
import { item_data } from '../../Data/item_data';

import { getRanking } from '../../actions';

function ContentList() {

	const dispatch = useDispatch();
	const rankingList = useSelector(state=>state.ranking);
	const {loading,ranking,error} = rankingList;
	const interactionResult = useSelector((state) => state.interaction);
  const { success } = interactionResult;
	
	const [items, setItems] = useState([]);
	useEffect(()=>{
		dispatch(getRanking());
	},[success])

	useEffect(() => {
		setItems(ranking['items'].sort((a, b) => b.score - a.score));
	}, [ranking]);

	return (
		<div className="content-list-wrapper">
			{items.map((item, rank, _) => (
				<Content
					rank={rank+1}
					value={item.score}
					id={item.item}
					key={item.item}
					info={item_data[item.item]}
				/>
			))}
		</div>
	);
}

export default ContentList;
