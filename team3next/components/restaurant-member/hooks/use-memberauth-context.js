import { useContext } from "react";
import { MemberAuthContext } from "../context/auth-context";
export const useMemberAuthContext = () => useContext(MemberAuthContext);
