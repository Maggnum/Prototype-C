import { atom } from "jotai";

export const chosenUrl = atom(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
);
