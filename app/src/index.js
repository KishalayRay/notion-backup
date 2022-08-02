import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import myTheme from "./extendTheme";
import { AuthContextProvider } from "./context/authContext/AuthContext";

import { ApiAuthContextProvider } from "./context/apiAuthContext/ApiAuthContext";
import { DataApiContextProvider } from "./context/dataApiContext/DataApiContext";
import { OmdbContextProvider } from "./components/integrations/apis/Omdb/context/context";
import { OmdblistContextProvider } from "./components/integrations/apis/Omdb/omdblistContext/listContext";
import { StockDataContextProvider } from "./components/integrations/apis/StockData/context/context";
import { StockDatalistContextProvider } from "./components/integrations/apis/StockData/stockDatalistContext/listContext";
import { UnsplashContextProvider } from "./components/integrations/apis/Unsplash/context/context";
import { CalendarificContextProvider } from "./components/integrations/apis/Calenderific/CalendarificContext/listContext";
import { GooglebooksContextProvider } from "./components/integrations/apis/Googlebooks/context/context";
import { GooglebookslistContextProvider } from "./components/integrations/apis/Googlebooks/googlebookslistContext/listContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={myTheme}>
      <AuthContextProvider>
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
                            <App />
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
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
