import {Navigate} from 'react-router-dom'
export const PrivateRoute = ({ children, role }) => {
  return <>{isAdmin() ? children :<Navigate to = {"/login"}/>}</>;
};

const isAdmin = () => {
  // chekc jwt token (priovate)
//   ROle check
  return false;
};
