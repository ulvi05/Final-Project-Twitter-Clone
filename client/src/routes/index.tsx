import { createBrowserRouter } from "react-router-dom";
import { paths } from "@/constants/paths";
import RootLayout from "@/components/RootLayout";

import HomePage from "@/pages/(business)/home";
import ExplorePage from "@/pages/(business)/explore";
import ProfilePage from "@/pages/(business)/profile";
import LoginPage from "@/pages/(business)/auth/login/login";
import SignUpPage from "@/pages/(business)/auth/signup/signup";
import NotificationPage from "@/pages/(business)/notification";
import AuthGuard from "@/components/AuthLayout";
import SubscribePage from "@/pages/(business)/premium";

const router = createBrowserRouter([
  {
    path: "",
    element: <AuthGuard />,
    children: [
      {
        path: "",
        element: <RootLayout />,
        children: [
          {
            path: paths.HOME,
            element: <HomePage />,
          },
          {
            path: paths.EXPLORE,
            element: <ExplorePage />,
          },
          {
            path: paths.PROFILE(),
            element: <ProfilePage />,
          },
          {
            path: paths.NOTIFICATION,
            element: <NotificationPage />,
          },
        ],
      },
    ],
  },
  {
    path: paths.LOGIN,
    element: <LoginPage />,
  },
  {
    path: paths.SIGNUP,
    element: <SignUpPage />,
  },
  {
    path: paths.SUBSCRIBE,
    element: <SubscribePage />,
  },
]);

export default router;
