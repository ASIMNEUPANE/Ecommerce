import {Navigate} from 'react-router-dom'
export const PrivateRoute = ({ children, role }) => {
  return <>{isAdmin(role) ? children :<Navigate to = {"/login"}/>}</>;
};

const isAdmin = (role) => {
  // chekc jwt token (priovate)
//   ROle check
  return false;
};
