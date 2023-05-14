import React, { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";

interface AuthContext {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContext>({
  user: auth.currentUser,
  loading: true,
  logout: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export interface UserInfo {
  uid: string;
  displayName: string;
  email: string;
  isAuth: boolean;
  loading: boolean;
  photoURL?: string;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);
  console.log("auth provider changed");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      console.log("auth user ", user);
      setLoading(false);
    });

    return () => {
      unsub();
      console.log("unAuthUser");
    };
  }, []);

  const logout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
