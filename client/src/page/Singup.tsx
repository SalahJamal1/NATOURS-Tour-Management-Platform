// type Props = {};

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { IUser } from "../context/AuthContext";
import toast from "react-hot-toast";
import { apiSignup } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiSignup(formData);
      navigate("/login");
      toast.success("Successfully logged in");
    } catch (err: any) {
      const msg: string = err?.response?.data?.message || err?.message;
      toast.error(msg);
    }
  };
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create your account</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              name="name"
              placeholder="Enter Your Name"
              required
              value={formData.name}
              onChange={onChange}
            />
          </div>
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
              maxLength={8}
              value={formData.password}
              onChange={onChange}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              confirm Password
            </label>
            <input
              className="form__input"
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="••••••••"
              required
              maxLength={8}
              value={formData.passwordConfirm}
              onChange={onChange}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">Signup</button>
          </div>
        </form>
      </div>
    </main>
  );
}
