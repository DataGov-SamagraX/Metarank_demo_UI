import {
    ITEMS_RANKING_REQUEST,
    ITEMS_RANKING_SUCCESS,
    ITEMS_RANKING_FAIL,
    ITEMS_INTERACTION_REQUEST,
    ITEMS_INTERACTION_SUCCESS,
    ITEMS_INTERACTION_FAIL,
}   from './constants';
 
// reducer to get the list of note related to a user
export const rankingReducer = (state = { ranking: {"items":[]} }, action) => {
	switch (action.type) {
		case ITEMS_RANKING_REQUEST:
			return { loading: true, ranking: { items: [] } };
		case ITEMS_RANKING_SUCCESS:
			return { loading: false, ranking: action.payload };
		case ITEMS_RANKING_FAIL:
			return { loading: false, error: action.payload, ranking: { items: [] } };
		default:
			return state;
	}
};

export const interactionReducer = (state = { }, action) => {
  switch (action.type) {
    case ITEMS_INTERACTION_REQUEST:
      return { loading: true };
    case ITEMS_INTERACTION_SUCCESS:
      return { loading: false, success: true };
    case ITEMS_INTERACTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};