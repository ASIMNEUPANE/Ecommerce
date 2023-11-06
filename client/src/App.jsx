import { BrowserRouter, Route, Routes } from "react-router-dom";

// LayOut
import { PrivateRoute, AdminRoute } from "./components/Routes";
import Layout from "./layouts/layout";
import AdminLayout from "./layouts/AdminLayout"; 

// Default Routes
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/LogIn";
import Checkout from "./pages/Checkout";
import { CheckoutPageStatus } from "./components/CheckoutStatus";

// Admin Routes
import Dashboard from "./pages/admin/Dashboard";
import { AddProduct, AdminProducts, EditProduct } from "./pages/admin/products";
import { AddCat, ListCat, EditCat } from "./pages/admin/categories";
import { AddUser, ListUser, EditUser } from "./pages/admin/users";
import { AddOrder, ListOrder, EditOrder } from "./pages/admin/orders";

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
                  <EditProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminRoute role="admin">
                  <ListCat />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories/add"
              element={
                <AdminRoute role="admin">
                  <AddCat />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories/:id"
              element={
                <AdminRoute role="admin">
                  <EditCat />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute role="admin">
                  <ListUser />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users/add"
              element={
                <AdminRoute role="admin">
                  <AddUser />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <AdminRoute role="admin">
                  <EditUser/>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute role="admin">
                  <ListOrder />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders/add"
              element={
                <AdminRoute role="admin">
                  <AddOrder />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders/:id"
              element={
                <AdminRoute role="admin">
                  <EditOrder />
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
