import { Link } from "react-router-dom";

export default function ResetPasswordSuccess() {
  return (
    <>
      <p> Password successfully reset </p>
      <Link to={"/login"}> Login now </Link>
    </>
  );
}
