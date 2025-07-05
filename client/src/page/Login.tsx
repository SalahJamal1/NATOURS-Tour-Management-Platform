import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { IUser } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { apiLogin } from "../service/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { dispatch, loader, auth } = useAuth()!;
  const navigate = useNavigate();
  const [formData, setData] = useState<IUser>({
    email: "",
    password: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADER" });
    try {
      const res = await apiLogin(formData);
      if (res.status === 200) {
        localStorage.setItem("jwt", res.data.token);
        dispatch({ type: "SET_LOGIN", payload: res.data.doc });
        toast.success("Successfully logged in");
      }
    } catch (err: any) {
      const msg: string = err?.response?.data?.message || err?.message;
      toast.error(msg);
      dispatch({ type: "SET_ERROR", payload: msg });
    }
  };

  useEffect(() => {
    if (auth) navigate("/");
  }, [auth, navigate]);
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={onChange}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={onChange}
              maxLength={8}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" disabled={loader}>
              {loader ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
