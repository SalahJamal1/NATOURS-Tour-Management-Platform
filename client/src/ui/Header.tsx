import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { auth } = useAuth()!;

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All tours
        </Link>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {auth ? (
          <>
            <Link to="/account/booking" className="nav__el">
              My Booking
            </Link>
            <Link to="/account" className="nav__el">
              Account
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav__el">
              Log in
            </Link>
            <Link to="/signup" className="nav__el nav__el--cta">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
