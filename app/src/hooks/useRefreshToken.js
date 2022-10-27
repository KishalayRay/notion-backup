import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh");
    console.log(auth);
    console.log(response.data.data.accessToken);

    console.log(response.data.data.accessToken);
    //setAuth({ ...auth, accessToken: response.data.data.accessToken });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.data.accessToken);
      return {
        ...prev,
        isAdmin: response.data.data.isAdmin,
        accessToken: response.data.data.accessToken,
      };
    });

    return response.data.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
