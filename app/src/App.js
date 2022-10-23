import React, { useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/routeHelpers/Layout";
import ListListContainer from "./components/listList/ListListContainer";
import ListContaiter from "./components/list/ListContaiter";
import StatContainer from "./components/stat/StatContainer";
import LandingPage from "./pages/landingPage/LandingPage";
import Register from "./pages/register/Register";
import EmailVerify from "./pages/emailVerify/EmailVerify";
import Reset from "./pages/forgotPassword/Reset";
import Forgot from "./pages/forgotPassword/Forgot";
import Pricing from "./pages/pricing/Pricing";
import Login from "./pages/login/Login";
import IntegrationContainer from "./components/integrations/IntegrationContainer";
import OmdbContainer from "./components/integrations/apis/Omdb/OmdbContainer";
import OmdbDataApiContainer from "./components/integrations/apis/Omdb/omdbDataAPi/OmdDataApiContainer";
import StockDataContainer from "./components/integrations/apis/StockData/StockDataContainer";
import StockDataApiContainer from "./components/integrations/apis/StockData/stockDataAPi/StockDataApiContainer";
import UnsplashContainer from "./components/integrations/apis/Unsplash/UnsplashContainer";
import UnsplashDataApiContainer from "./components/integrations/apis/Unsplash/unsplashDataAPi/UnsplashDataApiContainer";
import CalendarificContainer from "./components/integrations/apis/Calenderific/CalendarificContainer";
import GoogleJobsContainer from "./components/integrations/apis/GoogleJobs/GoogleJobsContainer";
import GoogleKeywordContainer from "./components/integrations/apis/GoogleKeyword/GoogleKeywordContainer";
import TheNewsApiContainer from "./components/integrations/apis/TheNewsApi/TheNewsApiContainer";
import GooglebooksContainer from "./components/integrations/apis/Googlebooks/GooglebooksContainer";
import GooglebooksDataApiContainer from "./components/integrations/apis/Googlebooks/googlebooksDataAPi/GooglebooksDataApiContainer";
import SpoonacularContainer from "./components/integrations/apis/Spoonacular/SpoonacularContainer";
import SpoonacularDataApiContainer from "./components/integrations/apis/Spoonacular/spoonacularDataAPi/SpoonacularDataApiContainer";
import CaloriesBurnedContainer from "./components/integrations/apis/CaloriesBurned/CaloriesBurnedContainer";
import CaloriesBurnedDataApiContainer from "./components/integrations/apis/CaloriesBurned/CaloriesBurnedDataApi/CaloriesBurnedDataApiContainer";
import BigPictureContainer from "./components/integrations/apis/Bigpicture/BigPictureContainer";
import BigPictureDataApiContainer from "./components/integrations/apis/Bigpicture/BigPictureDataApi/BigPictureDataApiContainer";
import HunterContainer from "./components/integrations/apis/Hunter/HunterContainer";
import AccountContainer from "./components/Account/AccountContainer";
import PageNotFound from "./pages/error/PageNotFound";

import RequireAuth from "./pages/routeHelpers/RequireAuth";
import PersistLogin from "./pages/routeHelpers/PersistLogin";
import useAuth from "./hooks/useAuth";
const App = () => {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route path="/" index element={<LandingPage />} />
      <Route path="/auth/activate/:token" element={<EmailVerify />} />
      <Route path="/auth/activate/password/reset" element={<Forgot />} />
      <Route path="/auth/activate/password/reset/:token" element={<Reset />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<PageNotFound />} />
      <Route path="/*" element={<Layout />}>
        <Route elelment={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="upgrade" element={<Pricing />} />

            {localStorage.getItem("useremail") && (
              <Route path="apis" element={<ListListContainer />} />
            )}

            <Route path="integrations" element={<IntegrationContainer />} />

            <Route path="account" element={<AccountContainer />} />

            <Route path="usage" element={<StatContainer />} />

            <Route path="apis/:listId" element={<ListContaiter />} />

            {/* Omdb */}
            <Route path="integrations/Omdb" element={<OmdbContainer />} />
            <Route
              path="integrations/Omdb/apiImport"
              element={<OmdbDataApiContainer />}
            />
            {/* Omdb */}

            {/* Stockdata */}
            <Route
              path="integrations/Alphavantage"
              element={<StockDataContainer />}
            />
            <Route
              path="integrations/Alphavantage/apiImport"
              element={<StockDataApiContainer />}
            />
            {/* Stockdata */}

            {/* Unsplash */}
            <Route
              path="integrations/Unsplash"
              element={<UnsplashContainer />}
            />
            <Route
              path="integrations/Unsplash/apiImport"
              element={<UnsplashDataApiContainer />}
            />
            {/* Unsplash */}

            {/* Calendarific */}
            <Route
              path="integrations/Calendarific"
              element={<CalendarificContainer />}
            />

            {/* Calendarific */}
            {/* Googlejobs */}
            <Route
              path="integrations/Googlejobs"
              element={<GoogleJobsContainer />}
            />

            {/* Googlejobs */}
            {/* Googlekeyword */}
            <Route
              path="integrations/Googlekeyword"
              element={<GoogleKeywordContainer />}
            />

            {/* Googlekeyword */}
            {/* Hunter */}
            <Route path="integrations/Hunter" element={<HunterContainer />} />

            {/* Hunter */}

            {/* TheNewsApi */}
            <Route
              path="integrations/Thenewsapi"
              element={<TheNewsApiContainer />}
            />

            {/* TheNewsApi */}

            {/* Googlebooks */}
            <Route
              path="integrations/Googlebooks"
              element={<GooglebooksContainer />}
            />
            <Route
              path="integrations/Googlebooks/apiImport"
              element={<GooglebooksDataApiContainer />}
            />
            {/* Googlebooks */}

            {/* Spoonacular */}
            <Route
              path="integrations/Spoonacular"
              element={<SpoonacularContainer />}
            />
            <Route
              path="integrations/Spoonacular/apiImport"
              element={<SpoonacularDataApiContainer />}
            />
            {/* Spoonacular */}
            {/* CaloriesBurned */}
            <Route
              path="integrations/Caloriesburned"
              element={<CaloriesBurnedContainer />}
            />
            <Route
              path="integrations/Caloriesburned/apiImport"
              element={<CaloriesBurnedDataApiContainer />}
            />
            {/* CaloriesBurned */}
            {/* Bigpicture */}
            <Route
              path="integrations/Bigpicture"
              element={<BigPictureContainer />}
            />
            <Route
              path="integrations/Bigpicture/apiImport"
              element={<BigPictureDataApiContainer />}
            />
            {/* Bigpicture */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
