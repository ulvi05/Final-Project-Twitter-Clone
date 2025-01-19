import { createRoot } from "react-dom/client";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
