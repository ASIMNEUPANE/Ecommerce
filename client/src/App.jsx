import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/LogIn";
import { PrivateRoute, AdminRoute } from "./components/Routes";
import Checkout from "./pages/Checkout";
import AdminProducts from "./pages/admin/Product";
import { CheckoutPageStatus } from "./components/CheckoutStatus";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProducts from "./pages/admin/EditProducts";
import Layout from "./layouts/layout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Routes for normal users */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutPageStatus />} />
            <Route
              path="/checkout/failed"
              element={
                <CheckoutPageStatus
                  type="failure"
                  msg="Something went wrong. Try Again"
                  msgHeader="Transaction Failed"
                />
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductsDetails />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>

          {/* Routes for Admin  */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute role="admin">
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute role="admin">
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/add"
              element={
                <AdminRoute role="admin">
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/:id"
              element={
                <AdminRoute role="admin">
                  <EditProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminRoute role="admin">
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute role="admin">
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute role="admin">
                  <AddProduct />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
