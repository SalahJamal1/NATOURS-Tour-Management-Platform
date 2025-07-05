import { IoSettingsSharp } from "react-icons/io5";
import { RiBillFill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { apiLogout } from "../../service/apiAuth";

export default function SideBar() {
  const { dispatch } = useAuth()!;

  const onClick = async () => {
    try {
      const res = await apiLogout();
      if (res.status === 200) {
        localStorage.removeItem("jwt");
        dispatch({ type: "SET_LOGOUT" });
      }
    } catch (err: any) {
      console.log(err);
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };
  const { pathname } = useLocation();
  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li className={`${pathname === "/account" && "side-nav--active"}`}>
          <Link to="/account">
            <IoSettingsSharp />
            Settings
          </Link>
        </li>
        <li
          className={`${pathname === "/account/booking" && "side-nav--active"}`}
        >
          <Link to="/account/booking">
            <RiBillFill />
            My bookings
          </Link>
        </li>
        <li>
          <button onClick={onClick}>
            <TbLogout2 />
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
}
