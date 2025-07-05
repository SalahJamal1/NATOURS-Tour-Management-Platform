import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();
  const message = error as { data?: string; message?: string };

  return (
    <div className="error-container">
      <h1 className="error-heading">Something went wrong 😢</h1>
      <p className="error-message">{message.data || message.message}</p>
      <button className="error-btn" onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    </div>
  );
}

export default NotFound;
