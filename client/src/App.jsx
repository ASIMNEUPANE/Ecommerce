import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/home";
import Cart from "./pages/cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
