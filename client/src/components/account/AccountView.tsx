import { useAuth } from "../../hooks/useAuth";

export default function AccountView() {
  const { user } = useAuth()!;

  return (
    <div className="user-view__content">
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data">
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              defaultValue={user.name}
              disabled
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              defaultValue={user.email}
              disabled
            />
          </div>
          {/* <div className="form__group right">
        <button className="btn btn--small btn--green">
          Save settings
        </button>
      </div> */}
        </form>
      </div>
    </div>
  );
}
