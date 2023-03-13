import { atom } from "recoil";

export const userCredentialState = atom({
  key: "userCredential",
  default: {},
});

export const userProfileState = atom({
  key: "userProfile",
  default: {},
});
