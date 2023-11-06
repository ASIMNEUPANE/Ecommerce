import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getToken } from "../utils/session";
import moment from "moment";

console.log(jwt_decode);
export const AdminRoute = ({ children, role }) => {
  return (
    <>
      {isLoggedIn() && isAdmin(role) ? (
        children
      ) : isLoggedIn() && !isAdmin(role) ? (
        <Navigate replace to={"/admin/dashboard"} />
      ) : (
        <Navigate replace to={"/login"} />
      )}
    </>
  );
};

export const PrivateRoute = ({ children }) => {
  return <>{isLoggedIn() ? <Navigate to={"/admin/dashboard"} /> : children}</>;
};

const isAdmin = (role) => {
  if(!role) return true
  // CHECK JWT TOKEN (Private)
  const token = getToken();
  if (!token) return false;
  // check for access token duration
  const { data } = jwt_decode(token);
  const isValid = data.roles.includes(role);
  return isValid;
};

const isLoggedIn = () => {
  // check for access token
  const token = getToken();
  if (!token) return false;
  // check for access token duration
  const { exp } = jwt_decode(token);
  const now = new Date().valueOf();
  const isValid =  moment.unix(exp) > moment(now) ;
  return isValid;
};
