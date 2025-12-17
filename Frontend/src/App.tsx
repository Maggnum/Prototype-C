import type { FC } from "react";
import { MapView } from "./components/MapView/mapView";
import { ToastContainer } from "react-toastify";

export const App: FC = () => {
  return (
    <>
      <MapView />
      <ToastContainer />
    </>
  );
};
