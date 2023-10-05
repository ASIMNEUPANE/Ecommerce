import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./layouts/navbar";
import Footer from "./layouts/Footer";
import Stack from 'react-bootstrap/Stack';

const PrivateRoute = () => {};

<Stack gap={3}>
<div className="p-2">First item</div>
<div className="p-2">Second item</div>
<div className="p-2">Third item</div>
</Stack>

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <ProductsDetails />,
  },
  {
    path: "/admin/products",
    element: (
      <PrivateRoute>
        <ProductsDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    
    <div className="d-flex flex-column h-100">
        <Stack gap={3}>
        <Navbar />
      <main className="flex-shrink-0 vh-100">
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </main>

      <Footer />
    </Stack>
     
    </div>
  );
}

export default App;
