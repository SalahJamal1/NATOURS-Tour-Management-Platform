import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import UserLoader from "../components/account/UserLoader";

export default function AppLayout() {
  const navigation = useNavigation();
  const loader: boolean = navigation.state === "loading";
  return (
    <>
      <UserLoader />
      <Header />
      {loader && <Loader />}
      <Outlet />
      <Footer />
    </>
  );
}
