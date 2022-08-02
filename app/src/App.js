import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ListListContainer from "./components/listList/ListListContainer";
import ListContaiter from "./components/list/ListContaiter";
import LandingPage from "./pages/landingPage/LandingPage";
import Register from "./pages/register/Register";
import EmailVerify from "./pages/emailVerify/EmailVerify";
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
import GooglebooksContainer from "./components/integrations/apis/Googlebooks/GooglebooksContainer";
import GooglebooksDataApiContainer from "./components/integrations/apis/Googlebooks/googlebooksDataAPi/GooglebooksDataApiContainer";
import AccountContainer from "./components/Account/AccountContainer";
import { AuthContext } from "./context/authContext/AuthContext";
import PageNotFound from "./pages/error/PageNotFound";
//import List from "./components/list/ListList";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <LandingPage /> : <Navigate to="/apis" />}
        />
        <Route path="/auth/activate/:token" element={<EmailVerify />}></Route>
        <Route
          path="/upgrade"
          element={user ? <Pricing /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/apis"
          element={user ? <ListListContainer /> : <Navigate to="/" />}
        />
        <Route
          path="/integrations"
          element={user ? <IntegrationContainer /> : <Navigate to="/" />}
        />
        <Route
          path="/account"
          element={user ? <AccountContainer /> : <Navigate to="/" />}
        />
        <Route
          path="/apis/:listId"
          element={user ? <ListContaiter /> : <Navigate to="/" />}
        />
        {/* Omdb */}
        <Route
          path="/integrations/Omdb"
          element={user ? <OmdbContainer /> : <Navigate to="/" />}
        />
        <Route
          path="/integrations/Omdb/apiImport"
          element={user ? <OmdbDataApiContainer /> : <Navigate to="/" />}
        />

        {/* Omdb */}
        {/* Stockdata */}
        <Route
          path="/integrations/Alphavantage"
          element={user ? <StockDataContainer /> : <Navigate to="/" />}
        />
        <Route
          path="/integrations/Alphavantage/apiImport"
          element={user ? <StockDataApiContainer /> : <Navigate to="/" />}
        />
        {/* Stockdata */}
        {/* Unsplash */}
        <Route
          path="/integrations/Unsplash"
          element={user ? <UnsplashContainer /> : <Navigate to="/" />}
        />
        <Route
          path="/integrations/Unsplash/apiImport"
          element={user ? <UnsplashDataApiContainer /> : <Navigate to="/" />}
        />
        {/* Unsplash */}
        {/* Calendarific */}
        <Route
          path="/integrations/Calendarific"
          element={user ? <CalendarificContainer /> : <Navigate to="/" />}
        />

        {/* Calendarific */}
        {/* Googlebooks */}
        <Route
          path="/integrations/Googlebooks"
          element={user ? <GooglebooksContainer /> : <Navigate to="/" />}
        />
        <Route
          path="/integrations/Googlebooks/apiImport"
          element={user ? <GooglebooksDataApiContainer /> : <Navigate to="/" />}
        />
        {/* Googlebooks */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/apis" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/apis" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
