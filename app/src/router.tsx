import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import VisualizerPage from "./containers/VisualizerPage/VisualizerPage";

export default createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/visualizer",
    element: <VisualizerPage />,
  },
]);
