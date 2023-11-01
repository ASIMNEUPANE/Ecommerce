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
import { PrivateRoute, AdminRoute } from "./components/Routes";
import Checkout from "./pages/Checkout";
import AdminProducts from "./pages/admin/Product";
import { CheckoutPageStatus } from "./components/CheckoutStatus";
import Dashboard from "./pages/admin/Dashboard";
import { useSelector } from "react-redux";
import AdminNavbar from "./layouts/AdminNavbar";
const adminRoutes = [
  { path: "/products", component: <AdminProducts />, role: "admin" },
  { path: "/dashboard", component: <Dashboard />, role: "admin" },
  { path: "/orders", component: <AdminProducts />, role: "admin" },
  { path: "/users", component: <AdminProducts />, role: "admin" },
];

function App() {
  const { isLoggedIn,roles, user,error } = useSelector((state) => state.auth);
  

  return (
    <div className="">
      <BrowserRouter>
        {isLoggedIn ? <AdminNavbar /> : <Navbar />}
        <main className="flex-shrink-0 d-flex flex-column min-vh-100">
          <div className="container mt-2 mb-5">
            <Routes>
              <Route path="/" element=<Home /> />
              {adminRoutes.length > 0 &&
                adminRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={`/admin${route?.path}`}
                    element={
                      <AdminRoute role={route?.role}>
                        {route?.component}
                      </AdminRoute>
                    }
                  />
                ))}
              <Route path="/about" element=<About /> />
              <Route path="/cart" element=<Cart /> />
              <Route path="/contact" element=<Contact /> />
              <Route
                path="/login"
                element={
                  <PrivateRoute>
                    <Login />
                  </PrivateRoute>
                }
              />
              <Route path="/checkout" element=<Checkout /> />
              <Route path="/checkout/success" element=<CheckoutPageStatus /> />
              <Route
                path="/checkout/failed"
                element=<CheckoutPageStatus
                  type="failure"
                  msg="Something went wrong. Try Again"
                  msgHeader="Transaction Failed"
                />
              />
              <Route path="/products" element=<Products /> />
              <Route path="/products/:id" element=<ProductsDetails /> />

              <Route path="*" element=<ErrorPage /> />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
