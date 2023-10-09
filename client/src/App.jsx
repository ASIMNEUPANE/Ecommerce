import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/LogIn";
import Navbar from "./layouts/navbar";
import Footer from "./layouts/Footer";
import { PrivateRoute } from "./components/Routes";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <main className="flex-shrink-0 vh-100">
          <div className="container">
            <Routes>
              <Route path="/" element=<Home /> />
              <Route path="/products" element=<Products /> />
              <Route path="/carts" element=<Cart /> />
              <Route path="/contact" element=<Contact /> />
              <Route path="/login" element=<Login /> />
              <Route path="/checkout" element=<Checkout /> />
              <Route path="/about" element=<About /> />
              <Route path="/products/:id" element=<ProductsDetails /> />
              <Route
                path="/admin/products"
                element={
                  <PrivateRoute role= {"admin"}>
                    <Products/>
                  </PrivateRoute>
                }
              />
              <Route path="*" element=<ErrorPage /> />
            </Routes>
            <Footer />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
