import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { toursLoader } from "./components/tours/toursLoader";
import { tourLoader } from "./components/tour/tourLoader";
import { lazy, Suspense } from "react";
import Loader from "./ui/Loader";
import Signup from "./page/Singup";
import ProtectPage from "./page/ProtectPage";
import BookingPage from "./page/BookingPage";
import AccountView from "./components/account/AccountView";

const Account = lazy(() => import("./page/Account"));
const Login = lazy(() => import("./page/Login"));
const ToursPage = lazy(() => import("./page/ToursPage"));
const TourPage = lazy(() => import("./page/TourPage"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <ToursPage />,
        loader: toursLoader,
        errorElement: <Error />,
      },
      {
        path: "/tour/:id",
        element: <TourPage />,
        loader: tourLoader,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        element: (
          <ProtectPage>
            <Account />
          </ProtectPage>
        ),
        children: [
          {
            path: "/account",
            element: <AccountView />,
          },
          {
            path: "/account/booking",
            element: <BookingPage />,
          },
        ],
      },
    ],
  },
]);
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
