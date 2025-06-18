import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import AuthForm from "./AuthForm";
import WatchPickr from "./WatchPickr";

export default function AuthWrapper() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {user ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Welcome, {user.email}</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
          <WatchPickr user={user} />
        </div>
      ) : (
        <AuthForm onAuthSuccess={setUser} showRememberMe />
      )}
    </div>
  );
}

