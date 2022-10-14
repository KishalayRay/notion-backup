import { useEffect, createContext, useReducer } from "react";
import axios from "axios";
import Reducer from "./reducer";
//b3b93acc
const API = `https://api.spoonacular.com/recipes/complexSearch`;
const INITIAL_STATE = {
  isLoading: false,
  recipes: [],
  query: "",
};

export const SpoonacularContext = createContext(INITIAL_STATE);

export const SpoonacularContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api) => {
    dispatch("SET_LOADING");
    try {
      const response = await axios.get(api);
      const recipe = response.data;
      console.log(recipe);
      if (recipe.results) {
        dispatch({
          type: "GET_RECIPES",
          payload: {
            recipes: recipe.results,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchRecipe = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addRecipe = async (recipeId) => {
    dispatch({
      type: "ADD_RECIPE",
      payload: recipeId,
    });
  };

  const getApiKey = async (axiosPrivate) => {
    const response = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Spoonacular",
    });
    const apiKey = response.data.data.ApiKey.keys[0].key;

    fetachAPI(`${API}?apiKey=${apiKey}&query=${state.query}`);
  };

  return (
    <SpoonacularContext.Provider
      value={{
        isLoading: state.isLoading,
        recipes: state.recipes,
        query: state.query,
        dispatch,
        searchRecipe,
        getApiKey,
        addRecipe,
      }}
    >
      {children}
    </SpoonacularContext.Provider>
  );
};
