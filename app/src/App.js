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
import CoinRankingContainer from "./components/integrations/apis/CoinRanking/CoinRankingContainer";
import CoinRankingApiContainer from "./components/integrations/apis/CoinRanking/CoinRankingApi/CoinRankingApiContainer";
import TriposoContainer from "./components/integrations/apis/Triposo/TriposoContainer";
import TriposoDataApiContainer from "./components/integrations/apis/Triposo/TriposoDataApi/TriposoDataApiContainer";
import AccountContainer from "./components/Account/AccountContainer";
import PageNotFound from "./pages/error/PageNotFound";

import RequireAuth from "./pages/routeHelpers/RequireAuth";
import PersistLogin from "./pages/routeHelpers/PersistLogin";
import useAuth from "./hooks/useAuth";
const App = () => {
  const { auth } = useAuth();
  const state = localStorage.getItem("userEmail");
  console.log(state, "state", !state);

  return (
    <Routes>
      <Route
        path="/"
        index
        element={!state ? <LandingPage /> : <Navigate replace to="/apis" />}
        //element={<LandingPage />}
      />
      <Route
        path="/auth/activate/:token"
        element={!state ? <EmailVerify /> : <Navigate replace to="/apis" />}
        //element={<EmailVerify />}
      />
      <Route
        path="/auth/activate/password/reset"
        element={!state ? <Forgot /> : <Navigate replace to="/apis" />}
        //element={<Forgot />}
      />
      <Route
        path="/auth/activate/password/reset/:token"
        element={!state ? <Reset /> : <Navigate replace to="/apis" />}
        // element={<Reset />}
      />
      <Route
        path="/register"
        element={!state ? <Register /> : <Navigate replace to="/apis" />}
        //element={<Register />}
      />
      <Route
        path="/login"
        element={!state ? <Login /> : <Navigate replace to="/apis" />}
        //element={<Login />}
      />

      <Route path="*" element={<PageNotFound />} />
      <Route path="/*" element={<Layout />}>
        <Route elelment={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route
              path="upgrade"
              element={state ? <Pricing /> : <Navigate replace to="/" />}
            />

            <Route
              path="apis"
              element={
                state ? <ListListContainer /> : <Navigate replace to="/" />
              }
            />

            <Route
              path="integrations"
              element={
                state ? <IntegrationContainer /> : <Navigate replace to="/" />
              }
            />

            <Route
              path="account"
              element={
                state ? <AccountContainer /> : <Navigate replace to="/" />
              }
            />

            <Route
              path="usage"
              element={state ? <StatContainer /> : <Navigate replace to="/" />}
            />

            <Route
              path="apis/:listId"
              element={state ? <ListContaiter /> : <Navigate replace to="/" />}
            />

            {/* Omdb */}
            <Route
              path="integrations/Omdb"
              element={state ? <OmdbContainer /> : <Navigate replace to="/" />}
            />
            <Route
              path="integrations/Omdb/apiImport"
              element={
                state ? <OmdbDataApiContainer /> : <Navigate replace to="/" />
              }
            />
            {/* Omdb */}

            {/* Stockdata */}
            <Route
              path="integrations/Alphavantage"
              element={
                state ? <StockDataContainer /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="integrations/Alphavantage/apiImport"
              element={
                state ? <StockDataApiContainer /> : <Navigate replace to="/" />
              }
            />
            {/* Stockdata */}

            {/* Unsplash */}
            <Route
              path="integrations/Unsplash"
              element={
                state ? <UnsplashContainer /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="integrations/Unsplash/apiImport"
              element={
                state ? (
                  <UnsplashDataApiContainer />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
            {/* Unsplash */}

            {/* Calendarific */}
            <Route
              path="integrations/Calendarific"
              element={
                state ? <CalendarificContainer /> : <Navigate replace to="/" />
              }
            />

            {/* Calendarific */}
            {/* Googlejobs */}
            <Route
              path="integrations/Googlejobs"
              element={
                state ? <GoogleJobsContainer /> : <Navigate replace to="/" />
              }
            />

            {/* Googlejobs */}
            {/* Googlekeyword */}
            <Route
              path="integrations/Googlekeyword"
              element={
                state ? <GoogleKeywordContainer /> : <Navigate replace to="/" />
              }
            />

            {/* Googlekeyword */}
            {/* Hunter */}
            <Route
              path="integrations/Hunter"
              element={
                state ? <HunterContainer /> : <Navigate replace to="/" />
              }
            />

            {/* Hunter */}

            {/* TheNewsApi */}
            <Route
              path="integrations/Thenewsapi"
              element={
                state ? <TheNewsApiContainer /> : <Navigate replace to="/" />
              }
            />

            {/* TheNewsApi */}

            {/* Googlebooks */}
            <Route
              path="integrations/Googlebooks"
              element={
                state ? <GooglebooksContainer /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="integrations/Googlebooks/apiImport"
              element={
                state ? (
                  <GooglebooksDataApiContainer />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
            {/* Googlebooks */}

            {/* Spoonacular */}
            <Route
              path="integrations/Spoonacular"
              element={
                state ? <SpoonacularContainer /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="integrations/Spoonacular/apiImport"
              element={
                state ? (
                  <SpoonacularDataApiContainer />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
            {/* Spoonacular */}
            {/* CaloriesBurned */}
            <Route
              path="integrations/Caloriesburned"
              element={
                state ? (
                  <CaloriesBurnedContainer />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
            <Route
              path="integrations/Caloriesburned/apiImport"
              element={
                state ? (
                  <CaloriesBurnedDataApiContainer />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
            {/* CaloriesBurned */}
            {/* Bigpicture */}
            <Route
              path="integrations/Bigpicture"
              element={
                state ? <BigPictureContainer /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="integrations/Bigpicture/apiImport"
              element={
                state ? (
                  <BigPictureDataApiContainer />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
            {/* Bigpicture */}
            {/* Coinranking */}
            <Route
              path="integrations/Coinranking"
              element={
                state ? <CoinRankingContainer /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="integrations/Coinranking/apiImport"
              element={
                state ? (
                  <CoinRankingApiContainer />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
            {/* Coinranking */}
            {/* Triposo */}
            <Route
              path="integrations/Triposo"
              element={
                state ? <TriposoContainer /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="integrations/Triposo/apiImport"
              element={
                state ? (
                  <TriposoDataApiContainer />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
            {/* Triposo */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
