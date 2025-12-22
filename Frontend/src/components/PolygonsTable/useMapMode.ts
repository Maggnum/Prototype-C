import { MapMode } from "@/models";
import { useSetAtom } from "jotai";
import { mapModeAtom } from "@/states";

export const useMapMode = () => {
  const setMapModeAtom = useSetAtom(mapModeAtom);
  const setMapMode = (mapMode: MapMode) => setMapModeAtom(mapMode);
  return setMapMode;
};
