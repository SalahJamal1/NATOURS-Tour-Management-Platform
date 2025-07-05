import { useEffect, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";

type Props = {
  children: ReactNode;
};

export default function ProtectPage({ children }: Props) {
  const { auth, loader } = useAuth()!;
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) navigate("/");
  }, [auth, navigate]);
  if (loader) return <Loader />;
  return auth ? children : null;
}
