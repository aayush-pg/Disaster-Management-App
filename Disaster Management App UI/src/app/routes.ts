import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { MeshMap } from "./components/MeshMap";
import { Messages } from "./components/Messages";
import { SafetyChecklist } from "./components/SafetyChecklist";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "map", Component: MeshMap },
      { path: "messages", Component: Messages },
      { path: "safety", Component: SafetyChecklist },
    ],
  },
]);
