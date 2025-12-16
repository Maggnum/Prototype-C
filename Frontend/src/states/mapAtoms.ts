import { atom } from "jotai";

export const chosenUrl = atom(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);
