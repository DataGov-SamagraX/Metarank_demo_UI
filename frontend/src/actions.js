import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import {
  ITEMS_RANKING_REQUEST,
  ITEMS_RANKING_SUCCESS,
  ITEMS_RANKING_FAIL,
  ITEMS_INTERACTION_REQUEST,
  ITEMS_INTERACTION_SUCCESS,
  ITEMS_INTERACTION_FAIL,
} from "./constants";
import { item_data } from "./Data/item_data";

const get_user_data = () => {
  const rankingId = uuidv4();
  let metarankConfig = JSON.parse(localStorage.getItem("metarank"));
  if (!metarankConfig) {
    metarankConfig = {
      id: "9583860237",
    };
  }
  metarankConfig["rankingId"] = rankingId;
  localStorage.setItem("metarank", JSON.stringify(metarankConfig));

  let data = {
    id: rankingId,
    timestamp: Date.now(),
    user: metarankConfig.id,
    session: metarankConfig.id,
    tenant: "default",
    fields: [],
    items: Object.keys(item_data).map((id) => {
      const obj = {
        id,
        relevancy: 0,
      };
      return obj;
    }),
  };
  return data;
};

const get_interaction_data = (item_id) => {
  const metarankConfig = JSON.parse(localStorage.getItem("metarank"));
  const data = {
    event: "interaction",
    id: uuidv4(),
    ranking: metarankConfig.rankingId,
    timestamp: Date.now(),
    user: metarankConfig.id,
    session: metarankConfig.id,
    type: "click",
    item: item_id,
    fields: [],
  };
  return data;
};

export const getRanking = () => async (dispatch) => {
  try {
    dispatch({ type: ITEMS_RANKING_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const userData = get_user_data();
    const { data } = await axios.post(
      "http://127.0.0.1:8000/rank",
      userData,
      config
    );
    dispatch({
      type: ITEMS_RANKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      // in case of error return error message
      type: ITEMS_RANKING_FAIL,
      payload:
        error.response && error.response.data?.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const make_interaction = (item_id) => async (dispatch) => {
  try {
    dispatch({
      type: ITEMS_INTERACTION_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const userData = get_interaction_data(item_id);
    // make a post request with the user data
    const { data } = await axios.post(
      "http://127.0.0.1:8000/interact",
      userData,
      config
    );
    dispatch({
      type: ITEMS_INTERACTION_SUCCESS,
    });
  } catch (error) {
    // in case of error return the error message
    dispatch({
      type: ITEMS_INTERACTION_FAIL,
      payload:
        error.response && error.response.data?.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
