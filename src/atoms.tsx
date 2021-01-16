
import { atom } from "recoil";


export const preferDarkState = atom({
  key: "preferDarkState", // unique ID (with respect to other atoms/selectors)
  default: false as boolean // default value (aka initial value)
});
