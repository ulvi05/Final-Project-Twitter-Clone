import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import router from "./routes";
import { Toaster } from "sonner";

import queryClient from "./config/queryClient";
import { store } from "./store/store";
import "./styles/index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="298772498250-qe0nr18pu95hui2em7lraibaedqbjnrd.apps.googleusercontent.com">
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors />
      </QueryClientProvider>
    </Provider>
  </GoogleOAuthProvider>
);
