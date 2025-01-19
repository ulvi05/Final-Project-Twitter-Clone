import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/(business)/home";
import { ExplorePage } from "../pages/(business)/explore";
import { ProfilePage } from "../pages/(business)/profile";

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
]);

export default router;
