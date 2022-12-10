import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import myTheme from "./extendTheme";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./context/authContext/AuthContext";

import { ApiAuthContextProvider } from "./context/apiAuthContext/ApiAuthContext";
import { DataApiContextProvider } from "./context/dataApiContext/DataApiContext";
import { OmdbContextProvider } from "./components/integrations/apis/Omdb/context/context";
import { OmdblistContextProvider } from "./components/integrations/apis/Omdb/omdblistContext/listContext";
import { StockDataContextProvider } from "./components/integrations/apis/StockData/context/context";
import { StockDatalistContextProvider } from "./components/integrations/apis/StockData/stockDatalistContext/listContext";
import { UnsplashContextProvider } from "./components/integrations/apis/Unsplash/context/context";
import { CalendarificContextProvider } from "./components/integrations/apis/Calenderific/CalendarificContext/listContext";
import { GoogleJobsContextProvider } from "./components/integrations/apis/GoogleJobs/GoogleJobsContext/listContext";
import { GoogleKeywordContextProvider } from "./components/integrations/apis/GoogleKeyword/GoogleKeywordContext/listContext";
import { TheNewsApiContextProvider } from "./components/integrations/apis/TheNewsApi/TheNewsApiContext/listContext";
import { GooglebooksContextProvider } from "./components/integrations/apis/Googlebooks/context/context";
import { GooglebookslistContextProvider } from "./components/integrations/apis/Googlebooks/googlebookslistContext/listContext";
import { SpoonacularContextProvider } from "./components/integrations/apis/Spoonacular/context/context";
import { SpoonacularlistContextProvider } from "./components/integrations/apis/Spoonacular/SpoonacularlistContext/listContext";
import { CaloriesBurnedContextProvider } from "./components/integrations/apis/CaloriesBurned/context/context";
import { CaloriesBurnedlistContextProvider } from "./components/integrations/apis/CaloriesBurned/caloriesBurnedlistContext/listContext";
import { BigPictureContextProvider } from "./components/integrations/apis/Bigpicture/context/context";
import { BigPicturelistContextProvider } from "./components/integrations/apis/Bigpicture/BigPicturelistContext/listContext";
import { HunterContextProvider } from "./components/integrations/apis/Hunter/context/context";
import { HunterlistContextProvider } from "./components/integrations/apis/Hunter/HunterContext/listContext";
import { CoinRankingContextProvider } from "./components/integrations/apis/CoinRanking/context/context";
import { CoinRankinglistContextProvider } from "./components/integrations/apis/CoinRanking/CoinRankinglistContext/listContext";
import { TriposoContextProvider } from "./components/integrations/apis/Triposo/context/context";
import { TriposolistContextProvider } from "./components/integrations/apis/Triposo/TriposolistContext/listContext";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./localstoragereducer/localstoragereducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

const store = configureStore({
  reducer: rootReducer,
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ChakraProvider theme={myTheme}>
            <AuthProvider>
              <ApiAuthContextProvider>
                <DataApiContextProvider>
                  <OmdbContextProvider>
                    <OmdblistContextProvider>
                      <StockDataContextProvider>
                        <StockDatalistContextProvider>
                          <UnsplashContextProvider>
                            <CalendarificContextProvider>
                              <GooglebooksContextProvider>
                                <GooglebookslistContextProvider>
                                  <TheNewsApiContextProvider>
                                    <SpoonacularContextProvider>
                                      <SpoonacularlistContextProvider>
                                        <CaloriesBurnedContextProvider>
                                          <CaloriesBurnedlistContextProvider>
                                            <GoogleJobsContextProvider>
                                              <GoogleKeywordContextProvider>
                                                <BigPictureContextProvider>
                                                  <BigPicturelistContextProvider>
                                                    <HunterContextProvider>
                                                      <HunterlistContextProvider>
                                                        <CoinRankingContextProvider>
                                                          <CoinRankinglistContextProvider>
                                                            <TriposoContextProvider>
                                                              <TriposolistContextProvider>
                                                                <Routes>
                                                                  <Route
                                                                    path="/*"
                                                                    element={
                                                                      <App />
                                                                    }
                                                                  />
                                                                </Routes>
                                                              </TriposolistContextProvider>
                                                            </TriposoContextProvider>
                                                          </CoinRankinglistContextProvider>
                                                        </CoinRankingContextProvider>
                                                      </HunterlistContextProvider>
                                                    </HunterContextProvider>
                                                  </BigPicturelistContextProvider>
                                                </BigPictureContextProvider>
                                              </GoogleKeywordContextProvider>
                                            </GoogleJobsContextProvider>
                                          </CaloriesBurnedlistContextProvider>
                                        </CaloriesBurnedContextProvider>
                                      </SpoonacularlistContextProvider>
                                    </SpoonacularContextProvider>
                                  </TheNewsApiContextProvider>
                                </GooglebookslistContextProvider>
                              </GooglebooksContextProvider>
                            </CalendarificContextProvider>
                          </UnsplashContextProvider>
                        </StockDatalistContextProvider>
                      </StockDataContextProvider>
                    </OmdblistContextProvider>
                  </OmdbContextProvider>
                </DataApiContextProvider>
              </ApiAuthContextProvider>
            </AuthProvider>
          </ChakraProvider>
        </Router>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
