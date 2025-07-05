import { useMemo, useReducer, type ReactNode } from "react";
import { AuthProvider } from "../hooks/useAuth";

type location = {
  description: string;
  type: "Point";
  coordinates: [number, number];
  address: string;
  day?: number;
};
export interface IBooking {
  _id: number | string;
  tour: IToure;
  price: number;
}
export interface IUser {
  _id?: string | number;
  name?: string;
  email: string;
  role?: "admin" | "user" | "guide" | "lead-guide";
  active?: boolean;
  photo?: string;
  password: string;
  passwordConfirm?: string | undefined;
  bookings?: IBooking[];
}
export interface IReview {
  _id: string | number;
  review: string;
  rating: number;
  user: IUser;
  tour: string;
}

export interface IToure {
  _id: string | number;
  startLocation: location;
  ratingsAverage: number;

  ratingsQuantity: number;
  images: string[];
  startDates: string[];
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: "medium" | "easy" | "difficult";

  guides: IUser[];
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: location[];
  reviews?: IReview[];
}
type Props = {
  children: ReactNode;
};

type StateType = {
  auth: boolean;
  user: IUser;
  loader: boolean;
  error: string;
};

const initialState: StateType = {
  auth: localStorage.getItem("jwt") ? true : false,
  user: {} as IUser,
  loader: false,
  error: "",
};

export type AuthContextType = {
  auth: boolean;
  user: IUser;
  loader: boolean;
  error: string;
  dispatch: (action: actionContext) => void;
};

export type actionContext =
  | { type: "SET_LOADER" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOGIN"; payload: IUser }
  | { type: "SET_USER"; payload: IUser }
  | { type: "SET_LOGOUT" };

function reducer(state: StateType, action: actionContext): StateType {
  switch (action.type) {
    case "SET_LOADER":
      return { ...state, loader: true };
    case "SET_ERROR":
      return { ...state, loader: false, error: action.payload };
    case "SET_LOGIN":
      return {
        ...state,
        loader: false,
        error: "",
        user: action.payload,
        auth: true,
      };
    case "SET_USER":
      return {
        ...state,
        loader: false,
        error: "",
        user: action.payload,
        auth: true,
      };
    case "SET_LOGOUT":
      return {
        ...state,
        loader: false,
        error: "",

        user: {} as IUser,
        auth: false,
      };
    default:
      return state;
  }
}
export default function AuthContext({ children }: Props) {
  const [{ user, auth, loader, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const value = useMemo(() => {
    return {
      user,
      auth,
      loader,
      error,
      dispatch,
    };
  }, [user, auth, loader, error, dispatch]);
  return (
    <AuthProvider.Provider value={value}>{children}</AuthProvider.Provider>
  );
}
