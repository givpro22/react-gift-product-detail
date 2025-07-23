import { fetchLoginApi, type UserInfo } from "@/api/auth";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";

type AuthContextType = {
  user: UserInfo | null;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(() => {
    const stored = sessionStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const { mutateAsync } = useMutation({
    mutationFn: fetchLoginApi,
    onSuccess: (result) => {
      sessionStorage.setItem("userInfo", JSON.stringify(result));
      setUser(result);
    },
  });

  const login = useCallback(async (email: string, password: string) => {
    return mutateAsync({ email, password });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("userInfo");
    setUser(null);
  }, []);

  const value = useMemo(() => {
    return { user, login, logout };
  }, [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
