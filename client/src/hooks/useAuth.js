import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//return values in authCOntext saves from repitive code
export function useAuth() {
  return useContext(AuthContext);
}
