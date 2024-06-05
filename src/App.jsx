import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

// layouts
import MainLayout from "./components/layout/MainLayout";

// pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Products from "./components/Products";
import SelectedCart from "./components/SelectedItems";

function App() {
  function Redirect({ children }) {
    let user = JSON.parse(localStorage.getItem("user")) ?? false;

    return user ? children : <Navigate to="/" />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* public routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/layout"
          element={
            <Redirect>
              <MainLayout />
            </Redirect>
          }
        >
          <Route path="products" element={<Products />} />
          <Route path="selected-cart" element={<SelectedCart />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
