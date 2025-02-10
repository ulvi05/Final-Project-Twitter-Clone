import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/(business)/home";
import { ExplorePage } from "../pages/(business)/explore";
import { ProfilePage } from "../pages/(business)/profile";
import LoginPage from "../pages/(business)/auth/login/LoginPage";
import SignUpPage from "../pages/(business)/auth/signup/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/explore",
    element: <ExplorePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

export default router;
