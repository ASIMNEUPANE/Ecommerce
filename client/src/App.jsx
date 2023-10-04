import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import Cart from './pages/Cart'
import Products from './pages/Products'
import ProductsDetails from './pages/ProductsDetails'
import ErrorPage from './pages/ErrorPage'
const PrivateRoute= ()=>{

}


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
  }
  ,
  {
    path: "/admin/products",
    element: <PrivateRoute >< ProductsDetails/></PrivateRoute>,
  }
  ,
  {
    path: "*",
    element: <ErrorPage />,
  }
]);


function App() {
  return <>
  
  <RouterProvider router={router} />
  
  </>;
}

export default App;
