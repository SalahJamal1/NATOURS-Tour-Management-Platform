import { Outlet } from "react-router-dom";
import SideBar from "../components/account/SideBar";
export default function Account() {
  return (
    <main className="main">
      <div className="user-view">
        <SideBar />
        <Outlet />
      </div>
    </main>
  );
}
