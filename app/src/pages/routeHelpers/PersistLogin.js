// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import useRefreshToken from "../../hooks/useRefreshToken";
// import useAuth from "../../hooks/useAuth";
// const PersistLogin = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const refresh = useRefreshToken();
//   const { auth } = useAuth();
//   useEffect(() => {
//     const verifyRefreshToken = async () => {
//       try {
//         await refresh();
//       } catch (e) {
//         console.log(e);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     !auth ? verifyRefreshToken() : setIsLoading(false);
//   }, []);
//   useEffect(() => {
//     console.log(`isLoading : ${isLoading}`);
//     console.log(`auth : ${auth}`);
//   }, [isLoading]);
//   return <>{isLoading ? <></> : <Outlet />}</>;
// };

// export default PersistLogin;
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    //let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        // isMounted &&
        setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth ? verifyRefreshToken() : setIsLoading(false);

    // return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;