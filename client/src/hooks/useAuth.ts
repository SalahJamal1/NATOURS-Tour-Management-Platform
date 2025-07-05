import { createContext, useContext } from "react";
import type { AuthContextType } from "../context/AuthContext";

export const AuthProvider = createContext<null | AuthContextType>(null);

export function useAuth(): null | AuthContextType {
  const x = useContext(AuthProvider);
  if (!x) throw new Error("useTours must be used within a ToursProvider");

  return x;
}
