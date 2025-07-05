import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { apiMe } from "../../service/apiAuth";

export default function UserLoader() {
  const { dispatch } = useAuth()!;
  useEffect(() => {
    async function fetchUser() {
      dispatch({ type: "SET_LOADER" });
      try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) throw new Error("The token is null");
        const res = await apiMe(jwt);
        if (res.status === 200) {
          dispatch({ type: "SET_USER", payload: res.data.user });
        }
      } catch (err: any) {
        dispatch({ type: "SET_ERROR", payload: err.message });
        throw Error(err.message);
      }
    }
    fetchUser();
  }, [dispatch]);
  return null;
}
