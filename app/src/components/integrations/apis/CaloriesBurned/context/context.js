import { createContext, useReducer } from "react";
import axios from "axios";
import Reducer from "./reducer";
const API = `https://api.api-ninjas.com/v1/caloriesburned`;
const INITIAL_STATE = {
  isLoading: false,
  activities: [],
  weight: 0,
  activity: "",
  duration: 0,
};

export const CaloriesBurnedContext = createContext(INITIAL_STATE);

export const CaloriesBurnedContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api, apiKey) => {
    dispatch("SET_LOADING");
    try {
      const response = await axios.get(api, {
        headers: { "X-Api-Key": apiKey },
      });
      const data = response.data;
      console.log(data);
      if (data.length) {
        dispatch({
          type: "GET_ACTIVITIES",
          payload: {
            activities: data,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchActivity = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addActivity = async (index) => {
    dispatch({
      type: "ADD_ACTIVITY",
      payload: index,
    });
  };

  const getApiKey = async (axiosPrivate) => {
    const response = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Caloriesburned",
    });
    const apiKey = response.data.data.ApiKey.keys[0].key;

    fetachAPI(
      `${API}?activity=${state.activity}&weight=${state.weight}&duration=${state.duration}`,
      apiKey
    );
  };

  return (
    <CaloriesBurnedContext.Provider
      value={{
        isLoading: state.isLoading,
        activities: state.activities,
        activity: state.activity,
        weight: state.weight,
        duration: state.duration,
        dispatch,
        searchActivity,
        getApiKey,
        addActivity,
      }}
    >
      {children}
    </CaloriesBurnedContext.Provider>
  );
};
